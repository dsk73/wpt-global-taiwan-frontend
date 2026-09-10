// src/app/[locale]/withdrawal/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/features/footer";

import type { Locale } from "@/providers";

import { isValidLocale } from "@/config/languages";

import {
  buildCanonical,
  buildLanguageAlternates,
  buildPageTitle,
  createMetadata,
  getOpenGraphLocale,
} from "@/lib/metadata";

/* ============================================================
   TYPES
============================================================ */

interface WithdrawalPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

interface WithdrawalContent {
  title: string;
  eyebrow: string;
  intro: string;

  overviewTitle: string;
  overview: string;

  stepsTitle: string;
  steps: {
    title: string;
    description: string;
  }[];

  requirementsTitle: string;
  requirements: {
    title: string;
    description: string;
  }[];

  verificationTitle: string;
  verification: string;

  verificationItems: string[];

  processingTitle: string;
  processing: string;

  importantTitle: string;
  importantItems: string[];

  faqTitle: string;
  faq: {
    question: string;
    answer: string;
  }[];

  relatedTitle: string;
  relatedDescription: string;

  registerLabel: string;
  registerUrl: string;

  depositLabel: string;
  depositUrl: string;

  teachingLabel: string;
  teachingUrl: string;

  termsLabel: string;
  termsUrl: string;

  kycLabel: string;
  kycUrl: string;

  breadcrumbHome: string;
  breadcrumbWithdrawal: string;

  disclaimer: string;
}

/* ============================================================
   SEO CONFIGURATION
============================================================ */

const SEO_CONFIG: Record<
  Locale,
  {
    title: string;
    description: string;
    keywords: string[];
  }
> = {
  "zh-Hant-TW": {
    title: "WPT Global 出金教學｜WPTG 提款指南與出金流程",
    description:
      "WPT Global 出金與提款教學，了解 WPTG 提款資格、KYC 驗證、最低提款金額、處理時間與重要注意事項，掌握完整 WPT Global 出金流程。",
    keywords: [
      "WPT Global 出金",
      "WPT Global 提款",
      "WPTG 出金",
      "WPTG 提款",
      "WPT Global 出金教學",
      "WPT Global 提款教學",
      "WPTG 出金教學",
      "WPTG 提款教學",
      "WPT Global 出金流程",
      "WPT Global 提款流程",
      "WPT Global 提款資格",
      "WPT Global KYC",
      "WPT Global 台灣",
      "WPTG 台灣",
    ],
  },

  en: {
    title: "How to Withdraw Money from WPT Global | WPTG Withdrawal Guide",
    description:
      "Learn how to withdraw money from WPT Global with this complete WPTG withdrawal guide covering eligibility, KYC verification, minimum withdrawal, processing and important requirements.",
    keywords: [
      "Withdraw money from WPT Global",
      "WPT Global withdrawal",
      "WPTG withdrawal",
      "WPT Global withdrawal guide",
      "WPT Global withdrawal tutorial",
      "WPTG withdrawal guide",
      "WPTG withdrawal tutorial",
      "WPT Global withdrawal process",
      "WPT Global withdrawal requirements",
      "WPT Global KYC",
      "WPT Global minimum withdrawal",
      "WPT Global Taiwan",
      "WPTG Taiwan",
    ],
  },

  "ms-MY": {
    title: "Panduan Pengeluaran WPT Global | Cara Withdraw WPTG",
    description:
      "Panduan pengeluaran WPT Global dan WPTG yang menerangkan kelayakan pengeluaran, pengesahan KYC, jumlah minimum, masa pemprosesan dan perkara penting sebelum membuat pengeluaran.",
    keywords: [
      "pengeluaran WPT Global",
      "withdraw WPT Global",
      "pengeluaran WPTG",
      "panduan pengeluaran WPT Global",
      "cara pengeluaran WPT Global",
      "tutorial pengeluaran WPT Global",
      "panduan pengeluaran WPTG",
      "proses pengeluaran WPT Global",
      "syarat pengeluaran WPT Global",
      "WPT Global KYC",
      "minimum pengeluaran WPT Global",
      "WPT Global Taiwan",
      "WPTG Taiwan",
    ],
  },
};

/* ============================================================
   PAGE CONTENT
============================================================ */

const CONTENT: Record<Locale, WithdrawalContent> = {
  "zh-Hant-TW": {
    title: "WPT Global 出金教學",
    eyebrow: "WPT GLOBAL 出金與提款指南",

    intro:
      "想了解 WPT Global 出金怎麼操作？本頁整理 WPT Global 提款資格、KYC 驗證、提款要求、最低提款金額、處理時間與重要注意事項，協助您更清楚掌握 WPT Global 出金流程。",

    overviewTitle: "WPT Global 出金是什麼？",

    overview:
      "WPT Global 提款是將符合提款條件的帳戶資金申請轉出的流程。實際提款申請會受到帳戶狀態、投注要求、交易限額、付款方式及安全驗證等因素影響。首次提款或特定情況下，WPT Global 可能要求完成身份、地址及付款來源等驗證後，才會進一步處理提款。",

    stepsTitle: "WPT Global 出金流程",

    steps: [
      {
        title: "確認帳戶符合提款資格",
        description:
          "提交提款前，請確認相關存款已符合官方提款及投注要求。官方條款規定，存入帳戶的資金須至少完整投注一次；同時，玩家還需要達到適用的抽水或總博彩營收要求。",
      },
      {
        title: "確認帳戶資料與付款方式",
        description:
          "提款通常會按照相關付款規則處理。提款款項原則上會支付至原存款所使用的帳戶或付款方式；如果無法使用原付款方式，可能需要驗證以玩家本人名義持有的替代付款帳戶。",
      },
      {
        title: "完成必要的 KYC 驗證",
        description:
          "提款可能需要完成身份與付款來源驗證。首次提款尤其可能需要提供身份證明、地址證明或付款方式相關文件。",
      },
      {
        title: "提交提款申請",
        description:
          "確認資格與驗證資料後，依 WPT Global 帳戶內提供的提款流程提交申請。實際可用付款方式及交易限額可能依帳戶、地區及當時政策而有所不同。",
      },
      {
        title: "等待提款處理",
        description:
          "完成必要驗證後，官方會進行提款處理。一般提款處理時間可能受到付款方式、安全審查及第三方金融機構影響，大額提款也可能需要較長時間進行額外檢查。",
      },
    ],

    requirementsTitle: "WPT Global 提款資格與要求",

    requirements: [
      {
        title: "存款需要符合投注要求",
        description:
          "官方條款指出，玩家必須先存款並至少投注一次，才具備提款資格。後續存入的款項同樣需要至少完整投注一次。",
      },
      {
        title: "需要符合抽水或 GGR 要求",
        description:
          "官方條款目前規定，玩家需要產生相當於存款金額至少 10% 的抽水或總博彩營收（GGR），提款申請才可進一步處理。",
      },
      {
        title: "最低提款金額",
        description:
          "官方條款目前列明最低提款金額為 US$5 或等值貨幣。實際交易限額可能隨政策或帳戶情況調整。",
      },
      {
        title: "付款方式需要符合規定",
        description:
          "提款通常會返回至原存款所使用的帳戶或付款方式。如果使用多種付款方式存款，WPT Global 可能依相關政策將提款分配至不同付款方式。",
      },
    ],

    verificationTitle: "WPT Global 出金與 KYC 驗證",

    verification:
      "提款時可能需要進行完整的 KYC（Know Your Customer）身份驗證。WPT Global 的 KYC 政策指出，提款通常會進行客戶盡職調查，以確認玩家身份並協助防止詐騙及其他風險活動。",

    verificationItems: [
      "政府核發的身份證明，例如身份證、護照或駕照。",
      "地址證明，例如符合要求的帳單或其他地址文件。",
      "付款方式或存款來源證明。",
      "使用信用卡時，可能需要提供卡片相關資訊以完成驗證。",
      "WPT Global 可能因帳戶或提款情況要求其他身份、資金來源或居住地相關資料。",
    ],

    processingTitle: "WPT Global 提款需要多久？",

    processing:
      "完成驗證並符合提款要求後，WPT Global 官方條款表示會努力在 72 小時內處理提款或退款。不過，實際時間可能因付款方式、第三方金融機構、安全審查及其他因素而有所不同。大型提款可能需要額外安全檢查，因此處理時間可能更長。",

    importantTitle: "WPT Global 出金重要注意事項",

    importantItems: [
      "提款交易限額可能隨時間及公司政策調整。",
      "提款必須符合適用的投注及抽水或 GGR 要求。",
      "首次提款可能需要完成較完整的 KYC 驗證。",
      "提款通常會依原存款付款方式處理。",
      "使用加密貨幣提款時，務必確認錢包地址及網路完全正確；錯誤地址或錯誤網路造成的轉帳可能無法獲得補償。",
      "大型提款可能需要額外安全審查。",
      "相關稅務及費用責任依適用法律及規定處理。",
    ],

    faqTitle: "WPT Global 出金常見問題",

    faq: [
      {
        question: "WPT Global 最低提款金額是多少？",
        answer:
          "目前官方條款列明最低提款金額為 US$5 或等值貨幣。實際提款限額可能依當時政策或帳戶情況調整。",
      },
      {
        question: "WPT Global 提款需要 KYC 嗎？",
        answer:
          "提款通常需要進行 KYC 驗證，尤其是首次提款。可能需要提供身份證明、地址證明及付款或存款來源相關文件。",
      },
      {
        question: "WPT Global 存款後可以立即提款嗎？",
        answer:
          "不是單純存款後即可提款。官方條款規定，存入的資金需要至少完整投注一次，並需要符合適用的抽水或 GGR 要求。",
      },
      {
        question: "WPT Global 提款需要多久？",
        answer:
          "官方條款表示，在完成驗證並符合要求後，會努力於 72 小時內處理提款或退款。但實際時間可能受到付款方式、第三方金融機構及安全審查影響。",
      },
      {
        question: "WPT Global 可以使用不同於存款的付款方式提款嗎？",
        answer:
          "提款通常會依原存款付款方式處理。如果原付款方式無法使用，可能需要確認及驗證玩家本人名下的替代付款帳戶。",
      },
      {
        question: "WPT Global 加密貨幣提款要注意什麼？",
        answer:
          "進行加密貨幣提款時，玩家需要自行確認提款地址及使用的區塊鏈網路正確。傳送至錯誤地址或使用錯誤網路可能無法獲得補償。",
      },
    ],

    relatedTitle: "WPT Global Taiwan 相關指南",

    relatedDescription:
      "如果您正在開始使用 WPT Global，可以先了解註冊、下載、儲值與撲克教學，再依需要查看提款資訊。",

    registerLabel: "WPT Global 註冊教學",
    registerUrl: "/zh-Hant-TW/teaching-center/registration-guide",

    depositLabel: "WPT Global 儲值教學",
    depositUrl: "/zh-Hant-TW/teaching-center/prepaid-value-guide",

    teachingLabel: "WPT Global 撲克教學",
    teachingUrl: "/zh-Hant-TW/teaching-center",

    termsLabel: "查看條款與細則",
    termsUrl: "/zh-Hant-TW/legal/terms-and-conditions",

    kycLabel: "查看 KYC 政策",
    kycUrl: "/zh-Hant-TW/legal/kyc-policy",

    breadcrumbHome: "首頁",
    breadcrumbWithdrawal: "WPT Global 出金教學",

    disclaimer:
      "本頁為 WPT Global Taiwan 的資訊與教學內容。提款資格、限額、付款方式、驗證要求及處理時間可能依官方政策、帳戶狀態、地區及付款服務提供者而有所變化。提交提款申請前，請以 WPT Global 最新官方條款、KYC 政策及帳戶內顯示的資訊為準。",
  },

  en: {
    title: "How to Withdraw Money from WPT Global",

    eyebrow: "WPT GLOBAL WITHDRAWAL GUIDE",

    intro:
      "Looking for a WPT Global withdrawal guide? This page explains how to withdraw money from WPT Global, including withdrawal eligibility, KYC verification, minimum withdrawal requirements, processing times and important points to check before submitting a withdrawal request.",

    overviewTitle: "What Is a WPT Global Withdrawal?",

    overview:
      "A WPT Global withdrawal is the process of requesting eligible funds to be transferred out of your player account. Withdrawal requests may be subject to account status, wagering requirements, transaction limits, payment-method rules and security verification. First-time withdrawals may require additional identity, address or payment-source verification before the request can be processed.",

    stepsTitle: "How to Withdraw Money from WPT Global",

    steps: [
      {
        title: "Check your withdrawal eligibility",
        description:
          "Before submitting a withdrawal, make sure your deposits meet the applicable wagering requirements. Under the current official terms, deposited funds must be wagered at least once, together with the applicable rake or GGR requirement.",
      },
      {
        title: "Check your account and payment details",
        description:
          "Withdrawals are normally processed according to the applicable payment rules. Withdrawals can generally be paid to the account or payment method from which the deposit originated. If that is not possible, an alternative account in your name may need to be verified.",
      },
      {
        title: "Complete required KYC verification",
        description:
          "A withdrawal may require identity and payment-source verification. First-time withdrawals may require documents such as photographic identification, proof of address or evidence relating to the payment method.",
      },
      {
        title: "Submit your withdrawal request",
        description:
          "Once your eligibility and verification requirements are satisfied, submit the withdrawal request through the withdrawal process available in your WPT Global account. Available payment methods and transaction limits may vary.",
      },
      {
        title: "Wait for withdrawal processing",
        description:
          "After the required verification has been completed, the withdrawal can be processed. Processing may depend on the payment method, security checks and third-party financial institutions. Large withdrawals may require additional review.",
      },
    ],

    requirementsTitle: "WPT Global Withdrawal Requirements",

    requirements: [
      {
        title: "Deposits must meet wagering requirements",
        description:
          "The current official terms state that a player must first make a deposit and wager it at least once to be eligible to withdraw funds. Subsequent deposits must also be wagered at least once in full.",
      },
      {
        title: "Rake or GGR requirement",
        description:
          "The current terms state that players must generate rake or gross gaming revenue (GGR) equivalent to at least 10% of the deposited amount before a withdrawal request can be processed.",
      },
      {
        title: "Minimum withdrawal amount",
        description:
          "The current official terms list a minimum withdrawal amount of US$5 or currency equivalent. Transaction limits may change according to applicable policies.",
      },
      {
        title: "Payment method requirements",
        description:
          "Withdrawals are normally paid through the payment method from which the deposit originated. If multiple payment methods were used for deposits, WPT Global may split the withdrawal across those payment methods in accordance with its policies.",
      },
    ],

    verificationTitle: "WPT Global Withdrawal and KYC Verification",

    verification:
      "Withdrawals may require full KYC (Know Your Customer) verification. WPT Global's KYC policy states that full customer due diligence will almost always be required on withdrawal to verify player identity and help prevent fraud and other risk activity.",

    verificationItems: [
      "Government-issued photographic identification such as an ID card, passport or driver's licence.",
      "Proof of address where required.",
      "Proof relating to the payment method or source of deposit.",
      "Card-related information may be requested when a card was used.",
      "Additional information about identity, source of funds or place of residence may be requested when necessary.",
    ],

    processingTitle: "How Long Does a WPT Global Withdrawal Take?",

    processing:
      "Once verification has been completed and the withdrawal requirements are satisfied, the current official terms state that WPT Global will endeavor to process withdrawals or refunds within 72 hours. Actual processing times may vary depending on the selected payment method, third-party financial institutions and security checks. Large withdrawals may take longer because they can require enhanced review.",

    importantTitle: "Important WPT Global Withdrawal Tips",

    importantItems: [
      "Withdrawal transaction limits may change over time.",
      "Withdrawal requests must satisfy the applicable wagering and rake or GGR requirements.",
      "First-time withdrawals may require more extensive KYC verification.",
      "Withdrawals are normally processed through the original deposit payment method.",
      "For cryptocurrency withdrawals, carefully verify the destination address and network. Transfers made to an incorrect address or through the wrong network may not be compensated.",
      "Large withdrawals may require additional security checks.",
      "Applicable taxes and fees are the player's responsibility where required by law or regulation.",
    ],

    faqTitle: "WPT Global Withdrawal FAQ",

    faq: [
      {
        question: "What is the minimum WPT Global withdrawal amount?",
        answer:
          "The current official terms list US$5 or currency equivalent as the minimum withdrawal amount. Applicable transaction limits may change.",
      },
      {
        question: "Do I need KYC to withdraw from WPT Global?",
        answer:
          "Withdrawals will generally require KYC verification, particularly for a first withdrawal. Documents such as photographic identification, proof of address and payment-source information may be requested.",
      },
      {
        question:
          "Can I withdraw immediately after making a WPT Global deposit?",
        answer:
          "Not simply by making a deposit. Under the current official terms, deposited funds must be wagered at least once and the applicable rake or GGR requirement must also be satisfied.",
      },
      {
        question: "How long does a WPT Global withdrawal take?",
        answer:
          "The current official terms state that, once verification is satisfactory, WPT Global will endeavor to process withdrawals or refunds within 72 hours. Actual timing may vary due to payment methods, third-party institutions and security reviews.",
      },
      {
        question:
          "Can I withdraw using a different payment method from my deposit?",
        answer:
          "Withdrawals are normally paid to the account or payment method from which the deposit originated. If that is not possible, an alternative account in the player's name may need to be verified.",
      },
      {
        question:
          "What should I check when making a WPT Global crypto withdrawal?",
        answer:
          "Players are responsible for correctly entering the cryptocurrency destination address and selecting the correct network. Transfers sent to an incorrect address or using the wrong network may not be compensated.",
      },
    ],

    relatedTitle: "More WPT Global Taiwan Guides",

    relatedDescription:
      "If you are getting started with WPT Global, explore the registration, download, deposit and poker teaching guides before reviewing the withdrawal information.",

    registerLabel: "WPT Global Registration Guide",
    registerUrl: "/en/teaching-center/registration-guide",

    depositLabel: "WPT Global Deposit Guide",
    depositUrl: "/en/teaching-center/prepaid-value-guide",

    teachingLabel: "WPT Global Poker Teaching Center",
    teachingUrl: "/en/teaching-center",

    termsLabel: "View Terms & Conditions",
    termsUrl: "/en/legal/terms-and-conditions",

    kycLabel: "View KYC Policy",
    kycUrl: "/en/legal/kyc-policy",

    breadcrumbHome: "Home",
    breadcrumbWithdrawal: "WPT Global Withdrawal Guide",

    disclaimer:
      "This page provides informational and educational content for WPT Global Taiwan. Withdrawal eligibility, limits, payment methods, verification requirements and processing times may change according to official policies, account status, jurisdiction and payment service providers. Always refer to the latest WPT Global Terms & Conditions, KYC policy and the information shown in your account before submitting a withdrawal request.",
  },

  "ms-MY": {
    title: "Panduan Pengeluaran WPT Global",

    eyebrow: "PANDUAN PENGELUARAN WPT GLOBAL",

    intro:
      "Mencari panduan pengeluaran WPT Global? Halaman ini menerangkan cara membuat pengeluaran daripada WPT Global, termasuk kelayakan pengeluaran, pengesahan KYC, jumlah minimum, masa pemprosesan dan perkara penting yang perlu diketahui sebelum menghantar permintaan pengeluaran.",

    overviewTitle: "Apakah Pengeluaran WPT Global?",

    overview:
      "Pengeluaran WPT Global ialah proses meminta dana yang layak dipindahkan keluar daripada akaun pemain. Permintaan pengeluaran boleh tertakluk kepada status akaun, syarat pertaruhan, had transaksi, peraturan kaedah pembayaran dan pengesahan keselamatan. Pengeluaran pertama mungkin memerlukan pengesahan identiti, alamat atau sumber pembayaran tambahan sebelum diproses.",

    stepsTitle: "Cara Membuat Pengeluaran WPT Global",

    steps: [
      {
        title: "Semak kelayakan pengeluaran",
        description:
          "Sebelum menghantar permintaan pengeluaran, pastikan deposit anda memenuhi syarat pertaruhan yang berkenaan. Berdasarkan terma rasmi semasa, dana yang didepositkan perlu dipertaruhkan sekurang-kurangnya sekali serta memenuhi keperluan rake atau GGR yang berkenaan.",
      },
      {
        title: "Semak akaun dan maklumat pembayaran",
        description:
          "Pengeluaran biasanya diproses mengikut peraturan pembayaran yang berkenaan. Pengeluaran secara amnya akan dibayar ke akaun atau kaedah pembayaran asal yang digunakan untuk deposit. Jika perkara tersebut tidak dapat dilakukan, akaun alternatif atas nama pemain mungkin perlu disahkan.",
      },
      {
        title: "Lengkapkan pengesahan KYC",
        description:
          "Pengeluaran mungkin memerlukan pengesahan identiti dan sumber pembayaran. Pengeluaran pertama mungkin memerlukan dokumen seperti pengenalan bergambar, bukti alamat atau bukti berkaitan kaedah pembayaran.",
      },
      {
        title: "Hantar permintaan pengeluaran",
        description:
          "Selepas kelayakan dan keperluan pengesahan dipenuhi, hantar permintaan pengeluaran melalui proses pengeluaran yang tersedia dalam akaun WPT Global anda. Kaedah pembayaran dan had transaksi yang tersedia mungkin berbeza.",
      },
      {
        title: "Tunggu pemprosesan pengeluaran",
        description:
          "Selepas pengesahan yang diperlukan selesai, permintaan pengeluaran boleh diproses. Masa pemprosesan bergantung pada kaedah pembayaran, semakan keselamatan dan institusi kewangan pihak ketiga. Pengeluaran berjumlah besar mungkin memerlukan semakan tambahan.",
      },
    ],

    requirementsTitle: "Syarat Pengeluaran WPT Global",

    requirements: [
      {
        title: "Deposit perlu memenuhi syarat pertaruhan",
        description:
          "Terma rasmi semasa menyatakan bahawa pemain perlu membuat deposit dan mempertaruhkannya sekurang-kurangnya sekali untuk layak mengeluarkan dana. Deposit berikutnya juga perlu dipertaruhkan sepenuhnya sekurang-kurangnya sekali.",
      },
      {
        title: "Keperluan rake atau GGR",
        description:
          "Terma semasa menyatakan bahawa pemain perlu menjana rake atau gross gaming revenue (GGR) bersamaan sekurang-kurangnya 10% daripada jumlah deposit sebelum permintaan pengeluaran boleh diproses.",
      },
      {
        title: "Jumlah minimum pengeluaran",
        description:
          "Terma rasmi semasa menyenaraikan jumlah minimum pengeluaran sebanyak US$5 atau nilai mata wang yang setara. Had transaksi boleh berubah mengikut polisi yang berkenaan.",
      },
      {
        title: "Keperluan kaedah pembayaran",
        description:
          "Pengeluaran biasanya dibayar melalui kaedah pembayaran yang digunakan untuk deposit asal. Jika beberapa kaedah pembayaran digunakan, WPT Global mungkin membahagikan pengeluaran mengikut kaedah pembayaran tersebut berdasarkan polisi yang berkenaan.",
      },
    ],

    verificationTitle: "Pengeluaran WPT Global dan Pengesahan KYC",

    verification:
      "Pengeluaran mungkin memerlukan pengesahan KYC (Know Your Customer) penuh. Polisi KYC WPT Global menyatakan bahawa semakan pelanggan penuh hampir selalu diperlukan semasa pengeluaran untuk mengesahkan identiti pemain dan membantu mencegah penipuan serta aktiviti berisiko lain.",

    verificationItems: [
      "Dokumen pengenalan bergambar yang dikeluarkan kerajaan seperti kad pengenalan, pasport atau lesen memandu.",
      "Bukti alamat jika diperlukan.",
      "Bukti berkaitan kaedah pembayaran atau sumber deposit.",
      "Maklumat berkaitan kad mungkin diminta jika kad digunakan.",
      "Maklumat tambahan mengenai identiti, sumber dana atau tempat tinggal mungkin diminta apabila diperlukan.",
    ],

    processingTitle: "Berapa Lama Pengeluaran WPT Global Diproses?",

    processing:
      "Selepas pengesahan selesai dan syarat pengeluaran dipenuhi, terma rasmi semasa menyatakan bahawa WPT Global akan berusaha memproses pengeluaran atau bayaran balik dalam tempoh 72 jam. Masa sebenar boleh berbeza bergantung pada kaedah pembayaran, institusi kewangan pihak ketiga dan semakan keselamatan. Pengeluaran besar mungkin mengambil masa lebih lama kerana semakan tambahan.",

    importantTitle: "Perkara Penting Mengenai Pengeluaran WPT Global",

    importantItems: [
      "Had transaksi pengeluaran boleh berubah dari semasa ke semasa.",
      "Permintaan pengeluaran perlu memenuhi syarat pertaruhan serta keperluan rake atau GGR yang berkenaan.",
      "Pengeluaran pertama mungkin memerlukan pengesahan KYC yang lebih lengkap.",
      "Pengeluaran biasanya diproses melalui kaedah pembayaran asal yang digunakan untuk deposit.",
      "Untuk pengeluaran mata wang kripto, pastikan alamat destinasi dan rangkaian yang dipilih adalah betul. Transaksi ke alamat salah atau melalui rangkaian yang salah mungkin tidak diberi pampasan.",
      "Pengeluaran berjumlah besar mungkin memerlukan semakan keselamatan tambahan.",
      "Cukai dan yuran yang berkenaan menjadi tanggungjawab pemain apabila dikehendaki oleh undang-undang atau peraturan.",
    ],

    faqTitle: "Soalan Lazim Pengeluaran WPT Global",

    faq: [
      {
        question: "Apakah jumlah minimum pengeluaran WPT Global?",
        answer:
          "Terma rasmi semasa menyenaraikan US$5 atau nilai mata wang yang setara sebagai jumlah minimum pengeluaran. Had transaksi yang berkenaan boleh berubah.",
      },
      {
        question: "Adakah saya perlu KYC untuk membuat pengeluaran WPT Global?",
        answer:
          "Pengeluaran secara amnya memerlukan pengesahan KYC, khususnya untuk pengeluaran pertama. Dokumen seperti pengenalan bergambar, bukti alamat dan maklumat sumber pembayaran mungkin diminta.",
      },
      {
        question:
          "Bolehkah saya membuat pengeluaran sejurus selepas deposit WPT Global?",
        answer:
          "Bukan hanya dengan membuat deposit. Berdasarkan terma rasmi semasa, dana yang didepositkan perlu dipertaruhkan sekurang-kurangnya sekali dan keperluan rake atau GGR yang berkenaan juga perlu dipenuhi.",
      },
      {
        question: "Berapa lama pengeluaran WPT Global mengambil masa?",
        answer:
          "Terma rasmi semasa menyatakan bahawa selepas pengesahan yang memuaskan, WPT Global akan berusaha memproses pengeluaran atau bayaran balik dalam tempoh 72 jam. Masa sebenar boleh berbeza disebabkan kaedah pembayaran, institusi pihak ketiga dan semakan keselamatan.",
      },
      {
        question:
          "Bolehkah saya mengeluarkan dana menggunakan kaedah pembayaran yang berbeza daripada deposit?",
        answer:
          "Pengeluaran biasanya dibayar ke akaun atau kaedah pembayaran asal yang digunakan untuk deposit. Jika perkara tersebut tidak dapat dilakukan, akaun alternatif atas nama pemain mungkin perlu disahkan.",
      },
      {
        question:
          "Apakah yang perlu saya semak untuk pengeluaran kripto WPT Global?",
        answer:
          "Pemain bertanggungjawab memastikan alamat destinasi mata wang kripto dan rangkaian yang digunakan adalah betul. Transaksi ke alamat salah atau menggunakan rangkaian yang salah mungkin tidak diberi pampasan.",
      },
    ],

    relatedTitle: "Panduan WPT Global Taiwan Lain",

    relatedDescription:
      "Jika anda baru bermula dengan WPT Global, lihat panduan pendaftaran, muat turun, deposit dan pembelajaran poker sebelum membaca maklumat pengeluaran.",

    registerLabel: "Panduan Pendaftaran WPT Global",
    registerUrl: "/ms-MY/teaching-center/registration-guide",

    depositLabel: "Panduan Deposit WPT Global",
    depositUrl: "/ms-MY/teaching-center/prepaid-value-guide",

    teachingLabel: "Pusat Pembelajaran Poker WPT Global",
    teachingUrl: "/ms-MY/teaching-center",

    termsLabel: "Lihat Terma & Syarat",
    termsUrl: "/ms-MY/legal/terms-and-conditions",

    kycLabel: "Lihat Polisi KYC",
    kycUrl: "/ms-MY/legal/kyc-policy",

    breadcrumbHome: "Laman Utama",
    breadcrumbWithdrawal: "Panduan Pengeluaran WPT Global",

    disclaimer:
      "Halaman ini menyediakan kandungan maklumat dan panduan untuk WPT Global Taiwan. Kelayakan pengeluaran, had, kaedah pembayaran, keperluan pengesahan dan masa pemprosesan boleh berubah mengikut polisi rasmi, status akaun, bidang kuasa dan penyedia perkhidmatan pembayaran. Sila rujuk Terma & Syarat WPT Global, polisi KYC dan maklumat terkini yang dipaparkan dalam akaun anda sebelum menghantar permintaan pengeluaran.",
  },
};

/* ============================================================
   METADATA
============================================================ */

export async function generateMetadata({
  params,
}: WithdrawalPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const seo = SEO_CONFIG[locale];

  const canonical = buildCanonical(locale, "/withdrawal");

  const languages = buildLanguageAlternates("/withdrawal");

  return createMetadata({
    title: buildPageTitle(seo.title),

    description: seo.description,

    keywords: seo.keywords,

    canonical,

    locale: getOpenGraphLocale(locale),

    type: "article",

    alternates: {
      canonical,
      languages,
    },
  });
}

/* ============================================================
   PAGE
============================================================ */

export default async function WithdrawalPage({ params }: WithdrawalPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const content = CONTENT[locale];

  const canonical = buildCanonical(locale, "/withdrawal");

  /* ----------------------------------------------------------
     JSON-LD
  ---------------------------------------------------------- */

  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "WebPage",

        "@id": `${canonical}#webpage`,

        url: canonical,

        name: content.title,

        description: SEO_CONFIG[locale].description,

        inLanguage: locale,

        isPartOf: {
          "@id": "https://wptglobal-asia.com/#website",
        },

        breadcrumb: {
          "@id": `${canonical}#breadcrumb`,
        },

        mainEntity: {
          "@id": `${canonical}#faq`,
        },
      },

      {
        "@type": "BreadcrumbList",

        "@id": `${canonical}#breadcrumb`,

        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: content.breadcrumbHome,
            item: buildCanonical(locale),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: content.breadcrumbWithdrawal,
            item: canonical,
          },
        ],
      },

      {
        "@type": "FAQPage",

        "@id": `${canonical}#faq`,

        mainEntity: content.faq.map((item) => ({
          "@type": "Question",

          name: item.question,

          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      {/* ======================================================
          PAGE STRUCTURED DATA
      ====================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* ======================================================
          PAGE
      ====================================================== */}

      <div className="min-h-screen bg-[#070B15] pt-32">
        {/* ====================================================
            HERO
        ==================================================== */}

        <section className="border-b border-white/10">
          <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-(--primary)">
                {content.eyebrow}
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {content.title}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl">
                {content.intro}
              </p>
            </div>
          </div>
        </section>

        {/* ====================================================
            MAIN CONTENT
        ==================================================== */}

        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          {/* ==================================================
              OVERVIEW
          ================================================== */}

          <section>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {content.overviewTitle}
            </h2>

            <p className="mt-6 max-w-4xl text-base leading-8 text-white/70 sm:text-lg">
              {content.overview}
            </p>
          </section>

          {/* ==================================================
              STEPS
          ================================================== */}

          <section className="mt-20">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {content.stepsTitle}
            </h2>

            <div className="mt-10 space-y-5">
              {content.steps.map((step, index) => (
                <article
                  key={step.title}
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/3
                    p-6
                    sm:p-8
                  "
                >
                  <div className="flex gap-5">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-(--primary)
                        text-sm
                        font-bold
                        text-black
                      "
                    >
                      {index + 1}
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {step.title}
                      </h3>

                      <p className="mt-3 leading-7 text-white/65">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ==================================================
              REQUIREMENTS
          ================================================== */}

          <section className="mt-20">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {content.requirementsTitle}
            </h2>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {content.requirements.map((item) => (
                <article
                  key={item.title}
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/3
                    p-6
                  "
                >
                  <h3 className="text-xl font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-white/65">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* ==================================================
              KYC
          ================================================== */}

          <section className="mt-20">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {content.verificationTitle}
            </h2>

            <p className="mt-6 max-w-4xl text-base leading-8 text-white/70 sm:text-lg">
              {content.verification}
            </p>

            <ul className="mt-8 space-y-4">
              {content.verificationItems.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-base leading-7 text-white/70"
                >
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-(--primary)" />

                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ==================================================
              PROCESSING
          ================================================== */}

          <section className="mt-20">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {content.processingTitle}
            </h2>

            <p className="mt-6 max-w-4xl text-base leading-8 text-white/70 sm:text-lg">
              {content.processing}
            </p>
          </section>

          {/* ==================================================
              IMPORTANT
          ================================================== */}

          <section className="mt-20">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {content.importantTitle}
            </h2>

            <div
              className="
                mt-8
                rounded-2xl
                border
                border-(--primary)/20
                bg-(--primary)/5
                p-6
                sm:p-8
              "
            >
              <ul className="space-y-4">
                {content.importantItems.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-base leading-7 text-white/75"
                  >
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-(--primary)" />

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ==================================================
              FAQ
          ================================================== */}

          <section className="mt-20">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {content.faqTitle}
            </h2>

            <div className="mt-10 space-y-5">
              {content.faq.map((item) => (
                <article
                  key={item.question}
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/3
                    p-6
                    sm:p-8
                  "
                >
                  <h3 className="text-xl font-semibold text-white">
                    {item.question}
                  </h3>

                  <p className="mt-4 leading-7 text-white/65">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          {/* ==================================================
              RELATED GUIDES
          ================================================== */}

          <section className="mt-20">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {content.relatedTitle}
            </h2>

            <p className="mt-5 max-w-3xl leading-7 text-white/65">
              {content.relatedDescription}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Link
                href={content.registerUrl}
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/3
                  p-5
                  text-white
                  transition
                  hover:border-(--primary)/40
                  hover:bg-white/5
                "
              >
                {content.registerLabel}
              </Link>

              <Link
                href={content.depositUrl}
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/3
                  p-5
                  text-white
                  transition
                  hover:border-(--primary)/40
                  hover:bg-white/5
                "
              >
                {content.depositLabel}
              </Link>

              <Link
                href={content.teachingUrl}
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/3
                  p-5
                  text-white
                  transition
                  hover:border-(--primary)/40
                  hover:bg-white/5
                "
              >
                {content.teachingLabel}
              </Link>
            </div>
          </section>

          {/* ==================================================
              OFFICIAL INFORMATION
          ================================================== */}

          <section className="mt-16 border-t border-white/10 pt-10">
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <Link
                href={content.termsUrl}
                className="text-sm font-medium text-white/60 underline decoration-white/20 underline-offset-4 transition hover:text-white"
              >
                {content.termsLabel}
              </Link>

              <Link
                href={content.kycUrl}
                className="text-sm font-medium text-white/60 underline decoration-white/20 underline-offset-4 transition hover:text-white"
              >
                {content.kycLabel}
              </Link>
            </div>

            <p className="mt-8 max-w-4xl text-sm leading-7 text-white/45">
              {content.disclaimer}
            </p>
          </section>
        </div>
      </div>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <Footer locale={locale} />
    </>
  );
}
