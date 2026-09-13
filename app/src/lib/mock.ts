// MOCK DATA — skeleton Fase 0. Nanti diganti Remote Functions + Drizzle.
// Prinsip grill (skill grilling): 1 pertanyaan/giliran, frontier-first.

export interface GrillStep {
	id: string;
	question: string;
	hint: string;
	options?: string[];
	contextLine: (answer: string) => string;
	sharpness: number; // kontribusi ke skor ketajaman (%)
}

export const GRILL_SCRIPT: GrillStep[] = [
	{
		id: 'idea',
		question: 'Ceritakan idemu sebebasnya — aplikasi apa yang mau kamu bangun?',
		hint: '1–3 kalimat cukup. Contoh: "aplikasi kasir untuk toko kelontong saya".',
		contextLine: (a) => `Ide: ${a}`,
		sharpness: 8
	},
	{
		id: 'persona',
		question: 'Siapa SATU pengguna utama yang paling menderita kalau aplikasi ini tidak ada?',
		hint: 'Spesifik! Bukan "masyarakat", tapi mis. "pemilik toko kelontong".',
		contextLine: (a) => `Pengguna utama: ${a}`,
		sharpness: 12
	},
	{
		id: 'pain',
		question: 'Saat ini dia menyelesaikan masalahnya pakai apa — dan bagian mana yang paling bikin nangis?',
		hint: 'Solusi hari ini + titik sakit terdalam.',
		contextLine: (a) => `Solusi hari ini & pain: ${a}`,
		sharpness: 12
	},
	{
		id: 'core',
		question: 'Kalau aplikasimu cuma boleh punya SATU fitur di hari peluncuran, fitur apa itu?',
		hint: 'Paksa pilih. Ini calon vertical slice pertamamu.',
		options: ['Pencatatan / CRUD inti', 'Laporan & rekap otomatis', 'Notifikasi / pengingat', 'Lainnya (ketik)'],
		contextLine: (a) => `Fitur hari-pertama: ${a}`,
		sharpness: 14
	},
	{
		id: 'platform',
		question: 'Aplikasinya mau jalan di mana?',
		hint: 'Menentukan scope teknis PRD.',
		options: ['Web saja', 'Android saja', 'Web + Android', 'Belum tahu (minta saran)'],
		contextLine: (a) => `Platform: ${a}`,
		sharpness: 10
	},
	{
		id: 'success',
		question: '3 bulan setelah launching, angka apa yang bikin kamu bilang "ini BERHASIL"?',
		hint: 'Contoh: "50 toko aktif", "rekap 5 menit, bukan 2 jam".',
		contextLine: (a) => `Definisi sukses: ${a}`,
		sharpness: 14
	},
	{
		id: 'constraint',
		question: 'Batasan paling nyata: soal waktu, budget, atau skill teknis?',
		hint: 'Jujur saja — AI akan menyesuaikan scope PRD.',
		options: ['Waktu (< 1 bulan)', 'Budget minim', 'Nol skill coding', 'Tidak ada batasan'],
		contextLine: (a) => `Batasan: ${a}`,
		sharpness: 12
	},
	{
		id: 'nonscope',
		question: 'Terakhir: satu hal yang aplikasimu TIDAK BOLEH coba lakukan (anti-fitur)?',
		hint: 'Out-of-scope yang jelas mencegah scope creep.',
		contextLine: (a) => `Out-of-scope: ${a}`,
		sharpness: 18
	}
];

export interface Project {
	id: string;
	title: string;
	stage: string;
	sharpness: number;
	updatedAt: string;
}

export const MOCK_PROJECTS: Project[] = [
	{ id: 'toko-online', title: 'Kasir Toko Kelontong', stage: 'Grill', sharpness: 34, updatedAt: '2 jam lalu' },
	{ id: 'absensi', title: 'Absensi Karyawan QR', stage: 'ABCD', sharpness: 100, updatedAt: 'kemarin' }
];

export const ABCD_DEFAULT = {
	A: { title: 'A — Audience', fields: { 'Persona utama': '', Peran: '', 'User journey singkat': '' } },
	B: {
		title: 'B — Business & Problem',
		fields: { 'Masalah': '', 'Tujuan bisnis': '', 'KPI sukses': '', 'Out-of-scope': '' }
	},
	C: {
		title: 'C — Capabilities',
		fields: { 'Fitur Must-have': '', 'Fitur Should-have': '', 'User story kunci': '' }
	},
	D: {
		title: 'D — Details & Constraints',
		fields: { Platform: '', Timeline: '', Budget: '', 'Acceptance criteria': '' }
	}
};

export interface Ticket {
	id: string;
	type: 'Research' | 'Prototype' | 'Grilling' | 'Task';
	title: string;
	status: 'fog' | 'frontier' | 'doing' | 'done';
}

export const WAYFINDER_MOCK: { destination: string; tickets: Ticket[] } = {
	destination: 'Spec modul pembayaran terkunci & siap ditulis ke PRD',
	tickets: [
		{ id: 'R-1', type: 'Research', title: 'Bandingkan Midtrans vs Xendit untuk QRIS', status: 'done' },
		{ id: 'G-1', type: 'Grilling', title: 'Putuskan: langganan vs sekali bayar?', status: 'frontier' },
		{ id: 'P-1', type: 'Prototype', title: 'Mockup halaman checkout (kasar)', status: 'frontier' },
		{ id: 'T-1', type: 'Task', title: 'Daftar akun sandbox Midtrans', status: 'doing' },
		{ id: 'R-2', type: 'Research', title: 'Alur refund & webhook expiry', status: 'fog' }
	]
};
