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
	{ id: 'absensi', title: 'Absensi Karyawan QR', stage: 'Form', sharpness: 100, updatedAt: 'kemarin' }
];

export interface FormQuestion {
	id: string;
	text: string;
	why: string; // kenapa ditanya (pola kuesioner: cegah jawaban asal)
	options: [string, string, string]; // opsi a/b/c; d = tulis sendiri
	prefillKey?: string; // kunci baris CONTEXT.md dari grill
	answerKey: string; // label jawaban di ringkasan
}

export interface FormSection {
	code: string;
	title: string;
	desc: string;
	questions: FormQuestion[];
}

// Struktur ABCD (Audience/Business/Capabilities/Details) disajikan sebagai kuesioner.
export const FORM_SECTIONS: FormSection[] = [
	{
		code: 'A',
		title: 'Audience',
		desc: 'Siapa yang kamu bela.',
		questions: [
			{
				id: 'A1',
				text: 'Siapa SATU pengguna utama aplikasimu?',
				why: 'Semua keputusan fitur dinilai dari kacamatanya.',
				options: ['Pemilik / pengelola usaha', 'Karyawan / staf operasional', 'Pelanggan / pembeli'],
				prefillKey: 'Pengguna utama',
				answerKey: 'Persona utama'
			},
			{
				id: 'A2',
				text: 'Seberapa melek-teknologi dia?',
				why: 'Menentukan seberapa sederhana UI harus dibuat.',
				options: ['Gaptek — harus super sederhana', 'Bisa HP untuk sehari-hari', 'Terbiasa aplikasi bisnis'],
				answerKey: 'Melek teknologi'
			},
			{
				id: 'A3',
				text: 'Aksi PERTAMA yang dia lakukan saat membuka aplikasi?',
				why: 'Layar pembuka harus melayani aksi ini.',
				options: ['Melihat ringkasan / laporan', 'Mencatat / input sesuatu', 'Mencari sesuatu'],
				answerKey: 'Aksi pertama'
			}
		]
	},
	{
		code: 'B',
		title: 'Business & Problem',
		desc: 'Sakitnya di mana, sembuhnya diukur apa.',
		questions: [
			{
				id: 'B1',
				text: 'Masalah termahal yang dia hadapi hari ini?',
				why: 'PRD yang bagus berangkat dari satu luka utama.',
				options: ['Kerja manual makan waktu', 'Data berantakan / hilang', 'Kehilangan pelanggan / uang'],
				prefillKey: 'Solusi hari ini & pain',
				answerKey: 'Masalah utama'
			},
			{
				id: 'B2',
				text: 'Bagaimana aplikasi ini menghasilkan (atau menghemat) uang?',
				why: 'Model bisnis mengunci scope fitur pembayaran.',
				options: ['Langganan bulanan', 'Sekali bayar', 'Gratis — hemat biaya operasional'],
				answerKey: 'Model bisnis'
			},
			{
				id: 'B3',
				text: 'Angka sukses 3 bulan setelah launching?',
				why: 'Tanpa angka, “berhasil” cuma perasaan.',
				options: ['Jumlah pengguna aktif', 'Waktu / uang yang dihemat', 'Transaksi / pendapatan'],
				prefillKey: 'Definisi sukses',
				answerKey: 'KPI sukses'
			},
			{
				id: 'B4',
				text: 'Satu hal yang TIDAK BOLEH dikerjakan aplikasi ini?',
				why: 'Anti-fitur mencegah scope creep.',
				options: ['Jangan sentuh pembayaran', 'Jangan multi-cabang', 'Jangan bikin aplikasi mobile'],
				prefillKey: 'Out-of-scope',
				answerKey: 'Out-of-scope'
			}
		]
	},
	{
		code: 'C',
		title: 'Capabilities',
		desc: 'Bisa apa — dan belum bisa apa.',
		questions: [
			{
				id: 'C1',
				text: 'SATU fitur wajib di hari peluncuran?',
				why: 'Vertical slice pertama = tulang punggung PRD.',
				options: ['Pencatatan / CRUD inti', 'Laporan & rekap otomatis', 'Notifikasi / pengingat'],
				prefillKey: 'Fitur hari-pertama',
				answerKey: 'Fitur must-have'
			},
			{
				id: 'C2',
				text: 'Fitur penting untuk rilis KEDUA?',
				why: 'Should-have dijadwalkan, bukan dilupakan.',
				options: ['Export / print laporan', 'Multi-user & peran', 'Integrasi pembayaran'],
				answerKey: 'Fitur should-have'
			},
			{
				id: 'C3',
				text: 'Kalau user minta tolong dalam 1 kalimat, bunyinya?',
				why: 'User story kunci = kompas seluruh tim.',
				options: ['“Catatkan X dalam < 1 menit”', '“Rekapkan Y otomatis”', '“Ingatkan saya Z tepat waktu”'],
				answerKey: 'User story kunci'
			}
		]
	},
	{
		code: 'D',
		title: 'Details & Constraints',
		desc: 'Batasan jujur = PRD realistis.',
		questions: [
			{
				id: 'D1',
				text: 'Aplikasi berjalan di mana?',
				why: 'Platform mengunci separuh keputusan teknis.',
				options: ['Web saja', 'Android saja', 'Web + Android'],
				prefillKey: 'Platform',
				answerKey: 'Platform'
			},
			{
				id: 'D2',
				text: 'Kapan harus bisa dipakai?',
				why: 'Timeline memaksa prioritas yang jujur.',
				options: ['< 1 bulan (MVP kilat)', '1–3 bulan', 'Santai (> 3 bulan)'],
				prefillKey: 'Batasan',
				answerKey: 'Timeline'
			},
			{
				id: 'D3',
				text: 'Budget bulanan untuk tool / server?',
				why: 'Budget memilihkan tumpukan teknologi.',
				options: ['Rp0 — gratisan saja', '< Rp1 juta', 'Fleksibel'],
				answerKey: 'Budget'
			},
			{
				id: 'D4',
				text: 'Kapan boleh dibilang “selesai”?',
				why: 'Kriteria selesai = kontrak dengan developer.',
				options: ['Semua tombol berfungsi, tanpa error', 'Dipakai user asli 1 minggu', 'Lolos cek keamanan dasar'],
				answerKey: 'Acceptance criteria'
			}
		]
	}
];

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
