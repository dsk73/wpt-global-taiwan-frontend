import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/features/footer";
import { Header } from "@/features/header";

import type { Locale } from "@/providers";

interface TeachingCenterPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

const CONTENT = {
  "zh-Hant-TW": {
    heroTitle: "玩家教學中心",
    heroDescription:
      "快速學會下載、註冊、儲值以及各種付款方式，新手玩家也能立即開始遊戲。",

    download: {
      title: "下載教學",
      description:
        "快速下載 WPT Global，支援 Windows、Android 與 iOS，幾分鐘內即可開始您的德州撲克之旅。",
      button: "查看教學",
    },

    register: {
      title: "註冊教學",
      description:
        "依照步驟完成帳號建立，輸入推薦碼並完成基本設定，立即開始您的 WPT Global 體驗。",
      button: "查看教學",
    },

    deposit: {
      title: "儲值教學",
      description: "了解如何完成首次儲值、領取新手優惠及開始遊戲。",
      button: "查看教學",
    },

    paymentTitle: "多元支付方式",
    paymentSubtitle: "安全加密・快速入金",
  },

  en: {
    heroTitle: "Player Guide Center",
    heroDescription:
      "Everything you need to start playing WPT Global—from downloading the app to registering, depositing and choosing the right payment method.",

    download: {
      title: "Download Guide",
      description:
        "Learn how to download WPT Global on Windows, Android and iOS in just a few simple steps.",
      button: "View Guide",
    },

    register: {
      title: "Registration Guide",
      description:
        "Create your account, enter the referral code and complete your profile before you start playing.",
      button: "View Guide",
    },

    deposit: {
      title: "Deposit Guide",
      description:
        "Learn how to make your first deposit and claim your welcome rewards.",
      button: "View Guide",
    },

    paymentTitle: "Multiple Payment Methods",
    paymentSubtitle: "Secure • Fast Deposits",
  },

  "ms-MY": {
    heroTitle: "Pusat Panduan Pemain",
    heroDescription:
      "Panduan lengkap untuk memuat turun aplikasi, mendaftar akaun, membuat deposit dan memilih kaedah pembayaran.",

    download: {
      title: "Panduan Muat Turun",
      description:
        "Pelajari cara memuat turun WPT Global untuk Windows, Android dan iOS dengan beberapa langkah mudah.",
      button: "Lihat Panduan",
    },

    register: {
      title: "Panduan Pendaftaran",
      description:
        "Daftar akaun, masukkan kod rujukan dan lengkapkan profil anda sebelum mula bermain.",
      button: "Lihat Panduan",
    },

    deposit: {
      title: "Panduan Deposit",
      description:
        "Ketahui cara membuat deposit pertama dan menuntut bonus alu-aluan anda.",
      button: "Lihat Panduan",
    },

    paymentTitle: "Pelbagai Kaedah Pembayaran",
    paymentSubtitle: "Selamat • Deposit Pantas",
  },
} as const;

export default async function TeachingCenterPage({
  params,
}: TeachingCenterPageProps) {
  const { locale } = await params;

  const t = CONTENT[locale];

  return (
    <>
      <Header />

      <main className="bg-[#070B15] pt-32">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_70%)]" />

          <div className="relative mx-auto max-w-7xl px-4 py-28 text-center sm:px-6 lg:px-8">
            <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-300">
              WPT Global Taiwan
            </span>

            <h1 className="mt-8 text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
              {t.heroTitle}
            </h1>

            <p className="mx-auto mt-8 max-w-4xl text-xl leading-10 text-white/70">
              {t.heroDescription}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl space-y-20 px-4 pb-24 sm:px-6 lg:px-8">
          {/* Download Guide */}

          <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300">
              Guide 01
            </span>

            <h2 className="mt-5 text-4xl font-bold text-white">
              {t.download.title}
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
              {t.download.description}
            </p>

            <Link
              href="#"
              className="mt-8 inline-flex rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white transition hover:scale-105"
            >
              {t.download.button}
            </Link>

            <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/teachingcenter/Downloadtutorial.jpg"
                alt="Download Guide"
                width={1600}
                height={900}
                className="h-auto w-full object-contain"
              />
            </div>
          </section>

          {/* Registration Guide */}

          <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300">
              Guide 02
            </span>

            <h2 className="mt-5 text-4xl font-bold text-white">
              {t.register.title}
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
              {t.register.description}
            </p>

            <Link
              href="#"
              className="mt-8 inline-flex rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white transition hover:scale-105"
            >
              {t.register.button}
            </Link>

            <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/teachingcenter/Registeredteaching.jpg"
                alt="Registration Guide"
                width={1600}
                height={900}
                className="h-auto w-full object-contain"
              />
            </div>
          </section>

          {/* Deposit Guide */}

          <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300">
              Guide 03
            </span>

            <h2 className="mt-5 text-4xl font-bold text-white">
              {t.deposit.title}
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
              {t.deposit.description}
            </p>

            <Link
              href="#"
              className="mt-8 inline-flex rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white transition hover:scale-105"
            >
              {t.deposit.button}
            </Link>

            <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/teachingcenter/PrepaidTeaching.jpg"
                alt="Deposit Guide"
                width={1600}
                height={900}
                className="h-auto w-full object-contain"
              />
            </div>
          </section>
          {/* Multiple Payment Methods */}
<section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
  <div className="text-center">
    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300">
      Guide 04
    </span>

    <h2 className="mt-5 text-4xl font-bold text-white">
      {t.paymentTitle}
    </h2>

    <p className="mt-4 text-lg text-white/60">
      {t.paymentSubtitle}
    </p>
  </div>

  <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-3">
    {[
      "/teachingcenter/payment1.jpg",
      "/teachingcenter/payment2.jpg",
      "/teachingcenter/payment3.jpg",
      "/teachingcenter/payment4.jpg",
      "/teachingcenter/payment5.jpg",
      "/teachingcenter/payment6.jpg",
    ].map((image, index) => (
      <div
        key={index}
        className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0D1424] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-[#111C30]"
      >
        <div className="relative aspect-5/4 w-full">
          <Image
            src={image}
            alt={`Payment Method ${index + 1}`}
            fill
            className="object-contain transition duration-300 group-hover:scale-105"
          />
        </div>
      </div>
    ))}
  </div>
</section>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
