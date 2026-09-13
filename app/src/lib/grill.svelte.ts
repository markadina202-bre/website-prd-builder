// Mock SkillRunner grill — .svelte.ts runes store (docs/02 § Hooks teknis).
// Nanti: tiap answer() memanggil Remote Function grill.answer (SSE).
import { GRILL_SCRIPT } from './mock';

export interface Message {
	role: 'ai' | 'user';
	text: string;
}

export class GrillSession {
	messages = $state<Message[]>([]);
	stepIndex = $state(0);
	sharpness = $state(0);
	contextLines = $state<string[]>([]);
	done = $state(false);
	thinking = $state(false);

	get step() {
		return GRILL_SCRIPT[this.stepIndex];
	}

	start() {
		if (this.messages.length > 0) return;
		this.ask();
	}

	private ask() {
		const s = this.step;
		if (!s) {
			this.done = true;
			this.messages.push({
				role: 'ai',
				text: 'Decision tree tuntas! Konteksmu solid. Lanjut ke Form — jawabanmu sudah terisi otomatis di sana.'
			});
			return;
		}
		this.messages.push({ role: 'ai', text: s.question });
	}

	answer(text: string) {
		const clean = text.trim();
		if (!clean || this.done || this.thinking) return;
		const s = this.step;
		this.messages.push({ role: 'user', text: clean });
		this.thinking = true;
		// Simulasi latensi AI; backend asli = streaming token di sini.
		setTimeout(() => {
			this.contextLines.push(s.contextLine(clean));
			this.sharpness = Math.min(100, this.sharpness + s.sharpness);
			this.stepIndex += 1;
			this.thinking = false;
			this.ask();
		}, 650);
	}

	wrapUp() {
		if (this.done) return;
		this.done = true;
		this.messages.push({
			role: 'ai',
			text: `Siap, kita wrap up di ketajaman ${this.sharpness}%. Kamu bisa lanjut ke Form atau tanya jawab lagi nanti.`
		});
	}

	reset() {
		this.messages = [];
		this.stepIndex = 0;
		this.sharpness = 0;
		this.contextLines = [];
		this.done = false;
		this.thinking = false;
		this.start();
	}
}

// 1 sesi per halaman (nanti: per projectId dari server).
export const grill = new GrillSession();
