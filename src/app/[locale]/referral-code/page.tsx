// src/app/[locale]/referral-code/page.tsx

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

interface ReferralCodePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

interface ReferralCodeContent {
  title: string;
  eyebrow: string;
  intro: string;

  overviewTitle: string;
  overview: string;

  howToTitle: string;
  howToSteps: {
    title: string;
    description: string;
  }[];

  benefitsTitle: string;
  benefits: {
    title: string;
    description: string;
  }[];

  registrationTitle: string;
  registration: string;

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

  downloadLabel: string;
  downloadUrl: string;

  depositLabel: string;
  depositUrl: string;

  teachingLabel: string;
  teachingUrl: string;

  bonusLabel: string;
  bonusUrl: string;

  breadcrumbHome: string;
  breadcrumbReferral: string;

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
    title: "WPT Global 推薦碼｜WPTG 推薦碼使用與註冊教學",
    description:
      "WPT Global 推薦碼與 WPTG 推薦碼完整教學，了解推薦碼是什麼、如何使用推薦碼完成註冊，以及 WPT Global 優惠與獎勵相關注意事項。",
    keywords: [
      "WPT Global 推薦碼",
      "WPTG 推薦碼",
      "WPT Global 推薦碼教學",
      "WPTG 推薦碼教學",
      "WPT Global Referral Code",
      "WPTG Referral Code",
      "WPT Global 台灣",
      "WPTG 台灣",
      "WPT Global 註冊",
      "WPTG 註冊",
      "WPT Global 優惠",
      "WPT Global 推薦",
      "WPT Global 註冊教學",
    ],
  },

  en: {
    title: "WPT Global Referral Code | WPTG Referral Code Guide",
    description:
      "Learn how to use a WPT Global referral code and WPTG referral code during registration, including how referral codes work, registration steps and important bonus terms.",
    keywords: [
      "WPT Global Referral Code",
      "WPTG Referral Code",
      "WPT Global referral code guide",
      "WPTG referral code guide",
      "WPT Global referral code tutorial",
      "WPTG referral code tutorial",
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "WPT Global Registration",
      "WPTG Registration",
      "WPT Global Offers",
      "WPT Global referral",
      "WPT Global registration guide",
    ],
  },

  "ms-MY": {
    title: "Kod Rujukan WPT Global | Panduan Kod Rujukan WPTG",
    description:
      "Panduan kod rujukan WPT Global dan WPTG yang menerangkan cara kod rujukan digunakan semasa pendaftaran, langkah pendaftaran serta perkara penting berkaitan tawaran dan ganjaran.",
    keywords: [
      "kod rujukan WPT Global",
      "kod rujukan WPTG",
      "panduan kod rujukan WPT Global",
      "panduan kod rujukan WPTG",
      "tutorial kod rujukan WPT Global",
      "WPT Global Referral Code",
      "WPTG Referral Code",
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "pendaftaran WPT Global",
      "pendaftaran WPTG",
      "tawaran WPT Global",
      "rujukan WPT Global",
    ],
  },
};

/* ============================================================
   PAGE CONTENT
============================================================ */

const CONTENT: Record<Locale, ReferralCodeContent> = {
  "zh-Hant-TW": {
    title: "WPT Global 推薦碼教學",

    eyebrow: "WPT GLOBAL 推薦碼與註冊指南",

    intro:
      "想了解 WPT Global 推薦碼怎麼使用？本頁整理 WPT Global 推薦碼與 WPTG 推薦碼的基本概念、註冊時的使用方式、推薦活動與優惠注意事項，協助您更清楚了解開始使用 WPT Global 前的相關流程。",

    overviewTitle: "什麼是 WPT Global 推薦碼？",

    overview:
      "WPT Global 推薦碼是一組可在註冊或指定推廣活動中使用的推薦資訊。符合條件的推薦碼可能與特定優惠、獎勵或推廣活動相關，但實際適用內容會依 WPT Global 當時提供的活動條款、帳戶資格及地區而有所不同。",

    howToTitle: "WPT Global 推薦碼怎麼使用？",

    howToSteps: [
      {
        title: "準備 WPT Global 推薦碼",
        description:
          "如果您取得了有效的 WPT Global 推薦碼，請在開始註冊前確認推薦碼內容正確。不同推廣活動可能使用不同的推薦資訊，因此請以當時提供給您的官方資訊為準。",
      },
      {
        title: "進入 WPT Global 註冊流程",
        description:
          "前往 WPT Global Taiwan 提供的註冊入口並開始建立帳戶。註冊時請使用您本人的真實資料，並按照頁面上的要求完成相關欄位。",
      },
      {
        title: "輸入推薦碼",
        description:
          "如果註冊流程提供推薦碼欄位，請按照頁面提示輸入有效的推薦碼。若推薦碼已經包含在您的專屬註冊連結中，則可能不需要另外手動輸入。",
      },
      {
        title: "完成帳戶註冊",
        description:
          "確認註冊資料及推薦資訊後完成帳戶建立。部分優惠或推薦活動可能需要在指定期限內完成其他條件，請仔細查看相關活動規則。",
      },
      {
        title: "查看適用優惠與資格",
        description:
          "完成註冊後，請依帳戶內顯示的資訊確認推薦優惠、獎勵或其他活動資格。實際獎勵內容以 WPT Global 當時公布的官方條款為準。",
      },
    ],

    benefitsTitle: "使用 WPT Global 推薦碼有什麼好處？",

    benefits: [
      {
        title: "可能取得指定推廣優惠",
        description:
          "符合資格的推薦碼可能與特定 WPT Global 推廣活動或優惠相關。優惠內容、資格及有效期限會依個別活動而有所不同。",
      },
      {
        title: "透過正確入口完成註冊",
        description:
          "使用指定推薦連結或推薦碼可以讓註冊流程與特定推廣活動建立關聯，方便確認是否符合相關活動資格。",
      },
      {
        title: "了解活動條件",
        description:
          "推薦碼相關活動通常會有指定資格、期限或其他條件。使用前先了解規則，可以避免因不符合條件而影響優惠資格。",
      },
    ],

    registrationTitle: "WPT Global 推薦碼與註冊",

    registration:
      "推薦碼通常與註冊流程相關。如果您是第一次使用 WPT Global，建議先完成正確的註冊流程，再依活動要求確認推薦碼或推薦連結是否成功套用。若推薦碼已透過專屬註冊連結提供，請直接使用該連結進入註冊流程。",

    importantTitle: "WPT Global 推薦碼重要注意事項",

    importantItems: [
      "推薦碼是否有效，取決於相關推廣活動及官方條款。",
      "不同推薦活動可能有不同的資格、期限及獎勵條件。",
      "推薦碼可能需要在註冊時或指定時間內使用。",
      "如果推薦碼已包含於專屬註冊連結，通常不需要再次手動輸入。",
      "請勿使用來源不明或聲稱提供未經官方確認優惠的推薦碼。",
      "優惠及獎勵並非所有帳戶、地區或情況都一定適用。",
      "註冊前及使用優惠前，請確認最新的官方活動條款。",
    ],

    faqTitle: "WPT Global 推薦碼常見問題",

    faq: [
      {
        question: "什麼是 WPT Global 推薦碼？",
        answer:
          "WPT Global 推薦碼是與推薦或推廣活動相關的一組推薦資訊，可能用於註冊或指定優惠活動。實際適用方式與優惠內容取決於當時的官方活動條款。",
      },
      {
        question: "WPT Global 推薦碼在哪裡輸入？",
        answer:
          "如果註冊頁面提供推薦碼欄位，可以按照頁面提示輸入。如果推薦碼已經包含在專屬註冊連結中，則可能不需要另外輸入。",
      },
      {
        question: "WPT Global 推薦碼可以在註冊後使用嗎？",
        answer:
          "是否可以在註冊後補用推薦碼取決於個別活動規則。部分推薦活動可能要求在建立帳戶時使用，因此建議在註冊前先確認相關條款。",
      },
      {
        question: "WPT Global 推薦碼會帶來優惠嗎？",
        answer:
          "部分推薦碼可能與指定優惠或獎勵活動相關，但並非所有推薦碼或帳戶都一定享有相同優惠。實際內容應以當時官方活動條款為準。",
      },
      {
        question: "WPT Global 推薦碼和推薦連結有什麼不同？",
        answer:
          "推薦碼通常是一組需要輸入的文字或代碼，而推薦連結則可能已將推薦資訊整合到註冊網址中。若使用專屬推薦連結，可能不需要額外輸入推薦碼。",
      },
      {
        question: "WPTG 推薦碼和 WPT Global 推薦碼是一樣的嗎？",
        answer:
          "WPTG 是 WPT Global 的常用品牌簡稱，因此搜尋時可能會看到 WPTG 推薦碼與 WPT Global 推薦碼等不同說法。實際推薦活動資格仍應以官方提供的推薦資訊與活動條款為準。",
      },
    ],

    relatedTitle: "WPT Global Taiwan 相關指南",

    relatedDescription:
      "如果您準備開始使用 WPT Global，可以先了解註冊、下載、儲值、撲克教學及出金資訊，再查看相關活動與優惠。",

    registerLabel: "WPT Global 註冊教學",
    registerUrl: "/zh-Hant-TW/teaching-center/registration-guide",

    downloadLabel: "WPT Global 下載教學",
    downloadUrl: "/zh-Hant-TW/teaching-center/download-guide",

    depositLabel: "WPT Global 儲值教學",
    depositUrl: "/zh-Hant-TW/teaching-center/prepaid-value-guide",

    teachingLabel: "WPT Global 撲克教學",
    teachingUrl: "/zh-Hant-TW/teaching-center",

    bonusLabel: "WPT Global 最新優惠",
    bonusUrl: "/zh-Hant-TW/activities",

    breadcrumbHome: "首頁",
    breadcrumbReferral: "WPT Global 推薦碼",

    disclaimer:
      "本頁為 WPT Global Taiwan 的資訊與教學內容。推薦碼、優惠、獎勵、資格及活動條件可能依官方政策、活動期限、帳戶狀態及地區而有所變化。請以 WPT Global 最新官方活動條款及帳戶內顯示的資訊為準。",
  },

  en: {
    title: "WPT Global Referral Code Guide",

    eyebrow: "WPT GLOBAL REFERRAL CODE & REGISTRATION GUIDE",

    intro:
      "Looking for a WPT Global referral code? This guide explains what a WPT Global referral code and WPTG referral code are, how referral codes may be used during registration, and what to check when participating in referral promotions or offers.",

    overviewTitle: "What Is a WPT Global Referral Code?",

    overview:
      "A WPT Global referral code is referral information that may be used during registration or as part of a specific promotional campaign. Referral codes can be associated with offers, bonuses or other promotional benefits, but eligibility, terms and availability depend on the specific WPT Global promotion and applicable account or regional requirements.",

    howToTitle: "How to Use a WPT Global Referral Code",

    howToSteps: [
      {
        title: "Get your WPT Global referral code",
        description:
          "If you have received a valid WPT Global referral code, check that the code is correct before starting registration. Different promotional campaigns may use different referral information, so always follow the official information provided for the promotion.",
      },
      {
        title: "Start the WPT Global registration process",
        description:
          "Use the WPT Global Taiwan registration entry point and begin creating your account. Use your own accurate information and complete the registration fields as requested.",
      },
      {
        title: "Enter the referral code",
        description:
          "If the registration process provides a referral-code field, enter the valid code as instructed. If the referral information is already included in your dedicated registration link, you may not need to enter a code manually.",
      },
      {
        title: "Complete your registration",
        description:
          "Review your registration details and referral information before completing account creation. Some referral promotions may require additional qualifying actions within a specified period.",
      },
      {
        title: "Check your applicable offer",
        description:
          "After registration, check the information displayed in your account to confirm whether a referral promotion, bonus or other offer applies. Actual benefits are subject to the current official promotional terms.",
      },
    ],

    benefitsTitle: "What Are the Benefits of Using a WPT Global Referral Code?",

    benefits: [
      {
        title: "Access to selected promotions",
        description:
          "Eligible referral codes may be connected to specific WPT Global promotions or offers. The available benefit, eligibility and validity period can vary by campaign.",
      },
      {
        title: "Connect registration with a promotion",
        description:
          "Using a designated referral link or referral code can associate your registration with a particular promotional campaign and help determine whether you meet its eligibility requirements.",
      },
      {
        title: "Understand promotional requirements",
        description:
          "Referral promotions can include eligibility rules, deadlines or qualifying requirements. Reviewing the terms before registration helps you understand what is required to receive an applicable offer.",
      },
    ],

    registrationTitle: "WPT Global Referral Code and Registration",

    registration:
      "Referral codes are generally connected with the registration process. If you are new to WPT Global, complete the correct registration process and check whether the referral code or referral link has been applied according to the relevant promotion. If referral information is already included in a dedicated registration link, use that link to begin registration.",

    importantTitle: "Important WPT Global Referral Code Information",

    importantItems: [
      "Referral-code validity depends on the applicable promotional campaign and official terms.",
      "Different referral campaigns can have different eligibility requirements, deadlines and rewards.",
      "A referral code may need to be used during registration or within a specified period.",
      "If the referral information is already included in a dedicated registration link, you may not need to enter a code manually.",
      "Avoid referral codes from unknown sources or claims that are not supported by official promotional information.",
      "Promotions and rewards may not be available to every account, region or situation.",
      "Always check the latest official promotional terms before registering or using an offer.",
    ],

    faqTitle: "WPT Global Referral Code FAQ",

    faq: [
      {
        question: "What is a WPT Global referral code?",
        answer:
          "A WPT Global referral code is referral information associated with a referral or promotional campaign. It may be used during registration or for a specific offer. The exact application and benefits depend on the current official promotional terms.",
      },
      {
        question: "Where do I enter a WPT Global referral code?",
        answer:
          "If the registration page provides a referral-code field, enter the code according to the instructions shown. If the referral information is already included in a dedicated registration link, you may not need to enter it separately.",
      },
      {
        question: "Can I use a WPT Global referral code after registering?",
        answer:
          "Whether a referral code can be applied after registration depends on the specific promotional rules. Some campaigns may require the code to be used when the account is created, so check the applicable terms before registering.",
      },
      {
        question: "Does a WPT Global referral code provide a bonus?",
        answer:
          "Some referral codes may be associated with specific offers or rewards, but not every code or account will necessarily receive the same benefit. Always refer to the current official promotional terms.",
      },
      {
        question:
          "What is the difference between a WPT Global referral code and referral link?",
        answer:
          "A referral code is normally a code that can be entered during registration, while a referral link may already contain the referral information in the registration URL. When using a dedicated referral link, a separate code may not be required.",
      },
      {
        question:
          "Is a WPTG referral code the same as a WPT Global referral code?",
        answer:
          "WPTG is commonly used as a shortened brand reference for WPT Global, so you may see both WPTG referral code and WPT Global referral code used when searching for referral information. Eligibility still depends on the official referral information and promotional terms.",
      },
    ],

    relatedTitle: "More WPT Global Taiwan Guides",

    relatedDescription:
      "If you are getting started with WPT Global, explore the registration, download, deposit, poker teaching and withdrawal guides before reviewing current activities and offers.",

    registerLabel: "WPT Global Registration Guide",
    registerUrl: "/en/teaching-center/registration-guide",

    downloadLabel: "WPT Global Download Guide",
    downloadUrl: "/en/teaching-center/download-guide",

    depositLabel: "WPT Global Deposit Guide",
    depositUrl: "/en/teaching-center/prepaid-value-guide",

    teachingLabel: "WPT Global Poker Teaching Center",
    teachingUrl: "/en/teaching-center",

    bonusLabel: "WPT Global Latest Offers",
    bonusUrl: "/en/activities",

    breadcrumbHome: "Home",
    breadcrumbReferral: "WPT Global Referral Code",

    disclaimer:
      "This page provides informational and educational content for WPT Global Taiwan. Referral codes, offers, rewards, eligibility and promotional conditions may change according to official policies, campaign periods, account status and region. Always refer to the latest official WPT Global promotional terms and the information displayed in your account.",
  },

  "ms-MY": {
    title: "Panduan Kod Rujukan WPT Global | Kod Rujukan WPTG",

    eyebrow: "PANDUAN KOD RUJUKAN & PENDAFTARAN WPT GLOBAL",

    intro:
      "Mencari kod rujukan WPT Global? Panduan ini menerangkan maksud kod rujukan WPT Global dan WPTG, cara kod rujukan boleh digunakan semasa pendaftaran serta perkara penting berkaitan promosi, tawaran dan ganjaran.",

    overviewTitle: "Apakah Kod Rujukan WPT Global?",

    overview:
      "Kod rujukan WPT Global ialah maklumat rujukan yang mungkin digunakan semasa pendaftaran atau sebagai sebahagian daripada kempen promosi tertentu. Kod rujukan boleh dikaitkan dengan tawaran, bonus atau manfaat promosi tertentu, tetapi kelayakan, syarat dan ketersediaannya bergantung pada promosi WPT Global serta keperluan akaun atau wilayah yang berkenaan.",

    howToTitle: "Cara Menggunakan Kod Rujukan WPT Global",

    howToSteps: [
      {
        title: "Dapatkan kod rujukan WPT Global",
        description:
          "Jika anda menerima kod rujukan WPT Global yang sah, pastikan kod tersebut betul sebelum memulakan pendaftaran. Kempen promosi yang berbeza mungkin menggunakan maklumat rujukan yang berbeza, jadi ikut maklumat rasmi yang diberikan untuk promosi tersebut.",
      },
      {
        title: "Mulakan proses pendaftaran WPT Global",
        description:
          "Gunakan pintu masuk pendaftaran WPT Global Taiwan dan mula membuat akaun anda. Gunakan maklumat diri yang tepat dan lengkapkan medan pendaftaran seperti yang diminta.",
      },
      {
        title: "Masukkan kod rujukan",
        description:
          "Jika proses pendaftaran menyediakan ruangan kod rujukan, masukkan kod yang sah mengikut arahan yang dipaparkan. Jika maklumat rujukan telah dimasukkan dalam pautan pendaftaran khusus, anda mungkin tidak perlu memasukkan kod secara manual.",
      },
      {
        title: "Lengkapkan pendaftaran",
        description:
          "Semak maklumat pendaftaran dan maklumat rujukan sebelum melengkapkan pembukaan akaun. Sesetengah promosi rujukan mungkin memerlukan tindakan tambahan dalam tempoh tertentu.",
      },
      {
        title: "Semak tawaran yang tersedia",
        description:
          "Selepas pendaftaran, semak maklumat yang dipaparkan dalam akaun anda untuk mengetahui sama ada promosi rujukan, bonus atau tawaran lain terpakai. Manfaat sebenar tertakluk kepada terma promosi rasmi semasa.",
      },
    ],

    benefitsTitle: "Apakah Kelebihan Menggunakan Kod Rujukan WPT Global?",

    benefits: [
      {
        title: "Akses kepada promosi tertentu",
        description:
          "Kod rujukan yang layak mungkin dikaitkan dengan promosi atau tawaran WPT Global tertentu. Manfaat, kelayakan dan tempoh sah boleh berbeza mengikut kempen.",
      },
      {
        title: "Menghubungkan pendaftaran dengan promosi",
        description:
          "Penggunaan pautan atau kod rujukan khusus boleh menghubungkan pendaftaran anda dengan kempen promosi tertentu dan membantu menentukan kelayakan anda.",
      },
      {
        title: "Memahami syarat promosi",
        description:
          "Promosi rujukan boleh mempunyai syarat kelayakan, tempoh atau keperluan tertentu. Semak terma sebelum mendaftar supaya anda memahami perkara yang diperlukan untuk mendapatkan tawaran yang berkenaan.",
      },
    ],

    registrationTitle: "Kod Rujukan WPT Global dan Pendaftaran",

    registration:
      "Kod rujukan biasanya berkaitan dengan proses pendaftaran. Jika anda baru menggunakan WPT Global, lengkapkan proses pendaftaran yang betul dan semak sama ada kod rujukan atau pautan rujukan telah digunakan mengikut promosi yang berkenaan. Jika maklumat rujukan telah dimasukkan dalam pautan pendaftaran khusus, gunakan pautan tersebut untuk memulakan pendaftaran.",

    importantTitle: "Perkara Penting Mengenai Kod Rujukan WPT Global",

    importantItems: [
      "Kesahan kod rujukan bergantung pada kempen promosi dan terma rasmi yang berkenaan.",
      "Kempen rujukan yang berbeza mungkin mempunyai syarat kelayakan, tempoh dan ganjaran yang berbeza.",
      "Kod rujukan mungkin perlu digunakan semasa pendaftaran atau dalam tempoh tertentu.",
      "Jika maklumat rujukan telah dimasukkan dalam pautan pendaftaran khusus, anda mungkin tidak perlu memasukkan kod secara manual.",
      "Elakkan menggunakan kod rujukan daripada sumber yang tidak diketahui atau dakwaan yang tidak disokong oleh maklumat promosi rasmi.",
      "Promosi dan ganjaran mungkin tidak tersedia untuk semua akaun, wilayah atau keadaan.",
      "Semak terma promosi rasmi terkini sebelum mendaftar atau menggunakan sesuatu tawaran.",
    ],

    faqTitle: "Soalan Lazim Kod Rujukan WPT Global",

    faq: [
      {
        question: "Apakah kod rujukan WPT Global?",
        answer:
          "Kod rujukan WPT Global ialah maklumat rujukan yang berkaitan dengan kempen rujukan atau promosi. Ia mungkin digunakan semasa pendaftaran atau untuk tawaran tertentu. Cara penggunaan dan manfaat sebenar bergantung pada terma promosi rasmi semasa.",
      },
      {
        question: "Di mana saya boleh memasukkan kod rujukan WPT Global?",
        answer:
          "Jika halaman pendaftaran menyediakan ruangan kod rujukan, masukkan kod mengikut arahan yang dipaparkan. Jika maklumat rujukan telah dimasukkan dalam pautan pendaftaran khusus, anda mungkin tidak perlu memasukkannya secara berasingan.",
      },
      {
        question:
          "Bolehkah saya menggunakan kod rujukan WPT Global selepas mendaftar?",
        answer:
          "Sama ada kod boleh digunakan selepas pendaftaran bergantung pada peraturan promosi tertentu. Sesetengah kempen mungkin memerlukan kod digunakan ketika akaun dibuat, jadi semak terma yang berkenaan sebelum mendaftar.",
      },
      {
        question: "Adakah kod rujukan WPT Global memberikan bonus?",
        answer:
          "Sesetengah kod rujukan mungkin dikaitkan dengan tawaran atau ganjaran tertentu, tetapi tidak semua kod atau akaun semestinya menerima manfaat yang sama. Rujuk terma promosi rasmi semasa.",
      },
      {
        question:
          "Apakah perbezaan antara kod rujukan WPT Global dan pautan rujukan?",
        answer:
          "Kod rujukan biasanya merupakan kod yang boleh dimasukkan semasa pendaftaran, manakala pautan rujukan mungkin sudah mengandungi maklumat rujukan dalam URL pendaftaran. Apabila menggunakan pautan rujukan khusus, kod berasingan mungkin tidak diperlukan.",
      },
      {
        question: "Adakah kod rujukan WPTG sama dengan kod rujukan WPT Global?",
        answer:
          "WPTG sering digunakan sebagai nama ringkas untuk WPT Global, jadi anda mungkin melihat istilah kod rujukan WPTG dan kod rujukan WPT Global ketika mencari maklumat rujukan. Kelayakan tetap bergantung pada maklumat rujukan dan terma promosi rasmi.",
      },
    ],

    relatedTitle: "Panduan WPT Global Taiwan Lain",

    relatedDescription:
      "Jika anda baru bermula dengan WPT Global, lihat panduan pendaftaran, muat turun, deposit, pembelajaran poker dan pengeluaran sebelum menyemak aktiviti serta tawaran terkini.",

    registerLabel: "Panduan Pendaftaran WPT Global",
    registerUrl: "/ms-MY/teaching-center/registration-guide",

    downloadLabel: "Panduan Muat Turun WPT Global",
    downloadUrl: "/ms-MY/teaching-center/download-guide",

    depositLabel: "Panduan Deposit WPT Global",
    depositUrl: "/ms-MY/teaching-center/prepaid-value-guide",

    teachingLabel: "Pusat Pembelajaran Poker WPT Global",
    teachingUrl: "/ms-MY/teaching-center",

    bonusLabel: "Tawaran Terkini WPT Global",
    bonusUrl: "/ms-MY/activities",

    breadcrumbHome: "Laman Utama",
    breadcrumbReferral: "Kod Rujukan WPT Global",

    disclaimer:
      "Halaman ini menyediakan kandungan maklumat dan panduan untuk WPT Global Taiwan. Kod rujukan, tawaran, ganjaran, kelayakan dan syarat promosi boleh berubah mengikut polisi rasmi, tempoh kempen, status akaun dan wilayah. Sila rujuk terma promosi rasmi WPT Global terkini serta maklumat yang dipaparkan dalam akaun anda.",
  },
};

/* ============================================================
   METADATA
============================================================ */

export async function generateMetadata({
  params,
}: ReferralCodePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const seo = SEO_CONFIG[locale];

  const canonical = buildCanonical(locale, "/referral-code");

  const languages = buildLanguageAlternates("/referral-code");

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

export default async function ReferralCodePage({
  params,
}: ReferralCodePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const content = CONTENT[locale];

  const canonical = buildCanonical(locale, "/referral-code");

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

            name: content.breadcrumbReferral,

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
              HOW TO USE
          ================================================== */}

          <section className="mt-20">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {content.howToTitle}
            </h2>

            <div className="mt-10 space-y-5">
              {content.howToSteps.map((step, index) => (
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
              BENEFITS
          ================================================== */}

          <section className="mt-20">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {content.benefitsTitle}
            </h2>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {content.benefits.map((item) => (
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
              REGISTRATION
          ================================================== */}

          <section className="mt-20">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {content.registrationTitle}
            </h2>

            <p className="mt-6 max-w-4xl text-base leading-8 text-white/70 sm:text-lg">
              {content.registration}
            </p>
          </section>

          {/* ==================================================
              IMPORTANT INFORMATION
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
                href={content.downloadUrl}
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
                {content.downloadLabel}
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

              <Link
                href={content.bonusUrl}
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
                {content.bonusLabel}
              </Link>
            </div>
          </section>

          {/* ==================================================
              DISCLAIMER
          ================================================== */}

          <section className="mt-16 border-t border-white/10 pt-10">
            <p className="max-w-4xl text-sm leading-7 text-white/45">
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
