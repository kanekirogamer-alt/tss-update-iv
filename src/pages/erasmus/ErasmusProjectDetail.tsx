import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ArrowRight, FileText, Images, Share2, Clock, CheckCircle, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import cofundedByEu from "@/assets/cofundedByEu.png";

// Project data
const projectsData: Record<string, {
  title: string;
  projectId: string;
  description: string;
  fullDescription: string[];
  image: string;
  previewImages: string[];
  videos?: { thumbnail: string; url: string }[];
  materials: { name: string; url: string }[];
  status: "ongoing" | "completed" | "coming_soon";
}> = {
  "project-1": {
    title: "E-Youth Work – Digitalize & Engage Youth",
    projectId: "2025-1-RO01-KA153-YOU-000301667",
    description: "Îmbunătățirea competențelor digitale ale lucrătorilor de tineret pentru a integra instrumente virtuale și metode nonformale inovatoare în activitățile cu tinerii.",
    fullDescription: [
      "\"E-Youth Work – Digitalize & Engage Youth\" este un curs de formare Erasmus+ (KA153) dedicat îmbunătățirii competențelor digitale ale lucrătorilor de tineret. Proiectul este implementat de organizația noastră, Today Social Skills (România), în parteneriat cu Promesas (Spania), Walbrzych Youth Association (Polonia), Pangea Youth Association (Turcia) și Bubburriga (Letonia). Mobilitatea principală s-a desfășurat în Craiova, România, în perioada 23–28 octombrie 2025, iar în prezent urmează etapa de diseminare.",
      "Scopul proiectului a fost dezvoltarea competențelor digitale relevante pentru lucrul cu tinerii, sprijinind 25 de lucrători de tineret din cele cinci organizații partenere să exploreze noi modalități de utilizare a instrumentelor virtuale și a metodelor nonformale online. Activitățile au vizat creșterea nivelului de alfabetizare digitală, aplicarea tehnicilor de gamificare și adaptarea metodelor de educație nonformală la mediul digital.",
      "Pe durata cursului, participanții au învățat să creeze și să testeze metode digitale inovatoare de lucru cu tinerii, să folosească platforme interactive precum Genially, Zoom, Google Forms și Canva, și să integreze instrumente virtuale în activitățile zilnice ale ONG-urilor lor. Ei au colaborat internațional, dezvoltând împreună metode digitale nonformale destinate implicării tinerilor din medii diverse.",
      "Rezultatele proiectului includ creșterea încrederii participanților în folosirea instrumentelor digitale, îmbunătățirea capacității organizațiilor de a lucra online și crearea unui cadru inovator pentru educația nonformală digitală. Urmează perioada de diseminare, care va include ateliere locale, activități de multiplicare și publicarea de materiale și resurse educaționale digitale, menite să valorifice rezultatele proiectului și să inspire alte organizații din rețeaua Erasmus+.",
      "Activitățile de diseminare ale proiectului au implicat peste 400 de participanți prin workshopuri, evenimente publice, sesiuni desfășurate în licee și webinarul „Wired for Change\", care a reunit peste 100 de participanți, oferind ocazia de a prezenta rezultatele proiectului, instrumentele digitale dezvoltate și exemple de bune practici. În paralel, maratonul de postări informaționale „Wired for Change\", desfășurat pe Instagram și Facebook, a contribuit semnificativ la creșterea vizibilității proiectului, generând peste 59.000 de vizualizări și impact cumulat, iar acest număr este în continuă creștere pe măsură ce materialele rămân disponibile online. Rezultatele demonstrează interesul comunității pentru temele abordate și sprijină promovarea pe termen lung a resurselor dezvoltate în cadrul proiectului. Totodată, voluntarii și-au dezvoltat competențele de comunicare digitală, facilitare, lucru în echipă și organizare de evenimente, contribuind la promovarea educației non-formale și la consolidarea unor conexiuni valoroase la nivel internațional."
    ],
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc02707221f9c49859a2070e5da77a1b1%2F057b5df2338746e4b7e6c8329dc025e0?format=webp&width=800",
    previewImages: [
      "https://lh3.googleusercontent.com/d/1w1M3olLf6JFTyyagl6DQpcJKAXkPj_-A=w1000",
      "https://lh3.googleusercontent.com/d/1AwBiMjsRWtndV6HPnV-GlkqhTBbZsDDP=w1000",
      "https://lh3.googleusercontent.com/d/1H2w_1mN-XMyiesMnIGEx11G08U7dnpDp=w1000"
    ],
    materials: [
      { name: "Key Competences Cards", url: "https://drive.google.com/file/d/1owN9cS1PsovliPhPwKZ8SHS5jCZHtW7J/view?usp=sharing" },
      { name: "Toolkit", url: "https://drive.google.com/file/d/1UIftbYbwp9Bu_fRk8V3WwVpQviJ0Ebt2/view" },
      { name: "Craiova Express", url: "https://en.actionbound.com/bound/craiovaexpress" }
    ],
    status: "completed"
  },
  "project-2": {
    title: "Shape the Future: Youth Financial Skills",
    projectId: "2024-3-RO01-KA153-YOU000279619",
    description: "Consolidarea competențelor financiare ale lucrătorilor de tineret pentru a sprijini educația financiară, responsabilitatea și incluziunea socială a tinerilor.",
    fullDescription: [
      "\"Shape the Future: Youth Financial Skills\" este un curs de formare Erasmus+ (KA153) pentru lucrători de tineret, implementat de organizația noastră, Today Social Skills (România), și Orenda Foundation (Bulgaria). Proiectul a inclus două mobilități internaționale: una în Varna, Bulgaria (18–24 iulie 2025) și alta în Craiova, România (1–8 septembrie 2025), și se află în prezent în etapa de diseminare a rezultatelor.",
      "Proiectul a fost conceput ca răspuns la nevoia comună a organizațiilor partenere de a dezvolta competențele financiare ale lucrătorilor de tineret, astfel încât aceștia să poată sprijini mai eficient tinerii din comunitățile lor în gestionarea resurselor financiare. Analizele locale din Craiova și Varna au arătat că tinerii, mai ales cei din medii vulnerabile, se confruntă cu dificultăți în planificarea bugetului personal, economisire și folosirea responsabilă a resurselor.",
      "Prin metode de educație non-formală: simulări financiare, ateliere interactive, jocuri de rol și exerciții de facilitare, cei 20 de lucrători de tineret implicați au dobândit abilități practice și teoretice esențiale pentru a face educația financiară accesibilă și atractivă. În plus, au dezvoltat competențe de motivare, comunicare, lucru în echipă, utilizare a limbii engleze și vorbire în public, consolidându-și rolul de formatori în comunitățile lor.",
      "În prezent, proiectul se află în faza de diseminare, prin organizarea de ateliere locale, activități de multiplicare, postări pe rețelele sociale și materiale vizuale, care promovează importanța educației financiare pentru tineri. Aceste acțiuni contribuie la extinderea impactului proiectului atât în România, cât și în Bulgaria, susținând obiectivul comun de incluziune socială prin educație financiară."
    ],
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc02707221f9c49859a2070e5da77a1b1%2Fc0af8de58cb4402f9fb3935cba659314?format=webp&width=800",
    previewImages: [
      "https://lh3.googleusercontent.com/d/1XDYONodJd-e3rVn6mpeQJ6RbaNj9LPMF=w1000",
      "https://lh3.googleusercontent.com/d/1Tx7efQUAdUVXUGeH1Z_kMgX-ufNvBYgP=w1000",
      "https://lh3.googleusercontent.com/d/1PmnTg9P_gsQ5kCrcCjaggFDIYaHu_XGL=w1000",
      "https://lh3.googleusercontent.com/d/1sqMH2fJazJvxee_Ef5xlLiLdV6LZbIM7=w1000",
      "https://lh3.googleusercontent.com/d/1bFoIpi7O2VTQ9GP_MkcgIUsX5-Q3RFEn=w1000",
      "https://lh3.googleusercontent.com/d/1NhdrLomFF84fouZFGAib-jqaQUOhS8WD=w1000",
      "https://lh3.googleusercontent.com/d/1gFZsitfYrB2jFfndBj-gK_bLm4PniaNk=w1000",
      "https://lh3.googleusercontent.com/d/1GYrDcM0oAGGhz3M7ip82sqpRTWmRiKjT=w1000",
      "https://lh3.googleusercontent.com/d/10J1kXvoOLb1gniSVM8W99tVJPI_Pa6-P=w1000",
      "https://lh3.googleusercontent.com/d/14eQAuAZUsBxRSb4mi0wjWU6qYV8WK007=w1000",
      "https://lh3.googleusercontent.com/d/1kr9zxgmzNMwFFT76ctZq3G0QGTgNltpe=w1000",
      "https://lh3.googleusercontent.com/d/1iaRjmS6ZPnf0wUGtQb0dUpiALzXmK8DT=w1000",
      "https://lh3.googleusercontent.com/d/1TcJ3-oxziCkm_3iIsLOVf0eQ7f5DES1-=w1000",
      "https://lh3.googleusercontent.com/d/1Nhk8Qs7RbSRlVISsF44zGkIdJaXjw-d-=w1000",
      "https://lh3.googleusercontent.com/d/1NGzQfVS_tt2t1fGPx7S4ImMjR3eUo0I2=w1000",
      "https://lh3.googleusercontent.com/d/1xXaXVAJDq86QIyKyS-4cAO4zKchXWMqg=w1000",
      "https://lh3.googleusercontent.com/d/1y_tTGGQsB7K4GoexKp3Dhf7RhTWDmBUl=w1000",
      "https://lh3.googleusercontent.com/d/1TrHppS0Kd3hmb8ekn_Qn3X31VilQ6yZe=w1000",
      "https://lh3.googleusercontent.com/d/1_Jr2yQN1Iro1WV6UL1--mg5MmM7fSjoP=w1000",
      "https://lh3.googleusercontent.com/d/1G247drKF3cxR2s-cfVwqvtar5CeH-nvU=w1000",
      "https://lh3.googleusercontent.com/d/1xKWD8q9SFe1PB5iMFT5CpN8D_AiC1LPh=w1000",
      "https://lh3.googleusercontent.com/d/16eaMqvCPkd5fnXVblgukQVlggPaTUeav=w1000",
      "https://lh3.googleusercontent.com/d/1XjY-CXli1GXY-8b2A2EbQ2wG0m_-4jNU=w1000",
      "https://lh3.googleusercontent.com/d/1cmyjXI5Kmw-jmqfB_dmelRVc7sxcxCTd=w1000",
      "https://lh3.googleusercontent.com/d/1tRK5y3nOEQkEFmqj3uHnvWgMM7Hm6Ytz=w1000",
      "https://lh3.googleusercontent.com/d/1PCU248AJGkedTsku2_Kj3QuzMe6bMufq=w1000",
      "https://lh3.googleusercontent.com/d/1biPLeOFzfX4y9n0IxJ4NSOFigQ0B8ECe=w1000",
      "https://lh3.googleusercontent.com/d/1MizYX2w1ZqFBHchFAboZFYDubjnCvrSW=w1000",
      "https://lh3.googleusercontent.com/d/14dETwKyEvkLztjDc5_rYIVZKMCtcGbJf=w1000",
      "https://lh3.googleusercontent.com/d/1kjZl3II92diSX8PgkDXvDFcjtmRNsHGF=w1000",
      "https://lh3.googleusercontent.com/d/1CGj7MNUzNY-vZH8vX2MWsuEE4wgma1ga=w1000",
      "https://lh3.googleusercontent.com/d/1OjOVuOiBqSVpeclDIWRx_k_FakoQCo8r=w1000",
      "https://lh3.googleusercontent.com/d/1IXoTKpgOcBtmBTRNt74dHMqR8NGQqvdy=w1000",
      "https://lh3.googleusercontent.com/d/1-1Vr0k7I_JxhkyVU49Fv0TVCtXJCbI2F=w1000",
      "https://lh3.googleusercontent.com/d/1uSZuEEbEnLWvsDmdgglxZu26ZWrLmImA=w1000",
      "https://lh3.googleusercontent.com/d/1hfywtwUKjPimIQIzMzhVCbceqeSrLRsh=w1000",
      "https://lh3.googleusercontent.com/d/1GK2g-kBPiJUqI9FlwogDJunZOciprRvx=w1000",
      "https://lh3.googleusercontent.com/d/1lEuve9Na1vu4Vjm_jfFyshtwk2MtxJdr=w1000",
      "https://lh3.googleusercontent.com/d/1_Ob6Yb65Z1fsGbaEvBbeZ6Obs--94mYS=w1000",
      "https://lh3.googleusercontent.com/d/1QNGGcZALLt-6isXR8pAg8_or9way4M8C=w1000",
      "https://lh3.googleusercontent.com/d/1GSA41fUsNYRO-xIwnPoNiwvdHqbHO4Aa=w1000",
      "https://lh3.googleusercontent.com/d/16zNkNY0cZ2pyREJ0TOtVk4vUvUSFauN3=w1000",
      "https://lh3.googleusercontent.com/d/1EtGyfSLTxXgGHspETrpMk4FYegSPjucw=w1000",
      "https://lh3.googleusercontent.com/d/1rxrIDMhqXe6SnyE4LRZMeWLhx7af1wKD=w1000",
      "https://lh3.googleusercontent.com/d/1rhpFxcmdfEkDRPpU7SJU6I6RWxm7siUi=w1000",
      "https://lh3.googleusercontent.com/d/1gAtyE9oCienC0HpnsiVAeQXKwWqkLiRT=w1000",
      "https://lh3.googleusercontent.com/d/1dEylNEbC2qXxtohEElwWlZGZwPzYQVTy=w1000",
      "https://lh3.googleusercontent.com/d/1mhTa-dVqi0UKfkSweGRuYJNvSOYw9Hco=w1000",
      "https://lh3.googleusercontent.com/d/1_U33pIivCBG9Ku3IjBqGzFuimOh7Ab3e=w1000",
      "https://lh3.googleusercontent.com/d/1QU84QJ8jWlbkI4mqKhAL0GWdpsSG2t-7=w1000",
      "https://lh3.googleusercontent.com/d/1GEmu8JY-Igfdh_iEslU-uO0NUznxp40y=w1000",
      "https://lh3.googleusercontent.com/d/19tty5Bdnic1Y9ngUxmx9XIRi3_7YZUBt=w1000",
      "https://lh3.googleusercontent.com/d/1wlW8lSM6H4R5SvUpwuQoPegpb7q4OrQm=w1000",
      "https://lh3.googleusercontent.com/d/1pzTorFoOknWyVw-Mgr49LiWIvSI1LHD3=w1000",
      "https://lh3.googleusercontent.com/d/1DcQnWyeHAqXEZKgubvguxv-if5pcNaCJ=w1000",
      "https://lh3.googleusercontent.com/d/1r-JIeFXV8R92mpy9ppoAX6Tt8iDVcz5U=w1000",
      "https://lh3.googleusercontent.com/d/1zSAZ3rlMqcEtalIQU9qxDE5aNud-vX-S=w1000",
      "https://lh3.googleusercontent.com/d/16Kzj9_onXWzZlAZCvBYO_RU61wh3-Bwx=w1000",
      "https://lh3.googleusercontent.com/d/1BR_nBIzRvH_qxjYaA3dkHCIKtuWbIXSd=w1000",
      "https://lh3.googleusercontent.com/d/1VajWMOwews1mZpknKg2Q8h8S53mLnIY6=w1000",
      "https://lh3.googleusercontent.com/d/1Q5sdR_sccmSLEdkYJc8cPDRc8e5wN26j=w1000",
      "https://lh3.googleusercontent.com/d/1k0uGDfCBykbdRl3ialIsxb7QgVbdqxYP=w1000",
      "https://lh3.googleusercontent.com/d/1cy0whcOUu_G88MsZ_FDRaeGEyl62pZlk=w1000",
      "https://lh3.googleusercontent.com/d/1YbzLUSF_9al6xYdLzFppfdHVRex84Kb3=w1000",
      "https://lh3.googleusercontent.com/d/1R6L8qLP27anK5LCEebMQE3uH5VpM7JjC=w1000",
      "https://lh3.googleusercontent.com/d/18YZ6rYx_kOe1yYqFvB3GZP3uP5zq_eE0=w1000",
      "https://lh3.googleusercontent.com/d/17yIQUsqCEn4HwU9x9_WItXC-y53GUL78=w1000",
      "https://lh3.googleusercontent.com/d/12RD6h8rgyGkA57oqt1_Ii8lmwmHQyG98=w1000",
      "https://lh3.googleusercontent.com/d/1K89y1qNHzFbgAb-NFqUhJdMQiaAezROF=w1000",
      "https://lh3.googleusercontent.com/d/1o2HqwbxpHfgNcBQ47dmnH6xjaLHFMGl-=w1000",
      "https://lh3.googleusercontent.com/d/1-J2dm7mvXRxS2bvCkD6tMO3CZTdPaWCy=w1000",
      "https://lh3.googleusercontent.com/d/1a2WmMdQ5yVJM-hlh-XIvGbEqxB-dycsD=w1000",
      "https://lh3.googleusercontent.com/d/1TwhkyVAMppWNRGFtUE_7LTauFewbU4pw=w1000",
      "https://lh3.googleusercontent.com/d/1IcJekIm2zo3UMct4vaiTR6qzcLMIzi6G=w1000",
      "https://lh3.googleusercontent.com/d/1DDquicxtUZhq1XJQiwJuwVFATMh2iXnw=w1000",
      "https://lh3.googleusercontent.com/d/150HbozryqX-8XNLqqtc7F5fx28D_MXLY=w1000",
      "https://lh3.googleusercontent.com/d/1o5fQNR2aCaQBLFx8mfoGoo8Z5dqlEHI_=w1000",
      "https://lh3.googleusercontent.com/d/1PIEAYpuNxHvTE2i03spUoeTpSuWzwK5q=w1000",
      "https://lh3.googleusercontent.com/d/1_On5pZROLyhYfxh3oiHmz1azT4OOa86H=w1000",
      "https://lh3.googleusercontent.com/d/1Qv-4MEqcHNEPFSACY4CAUPtVzzZKzLld=w1000",
      "https://lh3.googleusercontent.com/d/1dWDLIvnG5CgJaKn9QL7bHmCywiYtajVZ=w1000",
      "https://lh3.googleusercontent.com/d/1NDDl1dtfzG6oWQbkof_ISMF3dduahIe2=w1000",
      "https://lh3.googleusercontent.com/d/1hvrEiLSj8bidZdSqmKYYFcP9fkzHlEj-=w1000",
      "https://lh3.googleusercontent.com/d/1KoJTnLn9d22I8DL2ieQAPDLkBwKLKapO=w1000",
      "https://lh3.googleusercontent.com/d/10Axj5P0PcWW19sd-QYsx0cbIPfMuiPiX=w1000",
      "https://lh3.googleusercontent.com/d/1zYDTEQgvGSDAJ65ludeR-gEzOsYsqh7K=w1000",
      "https://lh3.googleusercontent.com/d/1rQEGZN8KmL0bcDlB4Txnq0B7O1i3pyl7=w1000",
      "https://lh3.googleusercontent.com/d/1eyjaC8c4J5w4jNlzmzE6j5ltN9snYxY_=w1000",
      "https://lh3.googleusercontent.com/d/1mESOE6Gj2oD5RFKs1x9toUQoIXd3LgIl=w1000",
      "https://lh3.googleusercontent.com/d/1F6WqBouXcfxx4L5EulwHky4U46yNcBZA=w1000",
      "https://lh3.googleusercontent.com/d/1CtOR83Sv2uiJhpi1U7Ts_1_h4i9eGsj2=w1000",
      "https://lh3.googleusercontent.com/d/1gevkk8G0xPgXWBxrcUQEw6Nn03Y1NTsP=w1000",
      "https://lh3.googleusercontent.com/d/1_MLQrQCDD45Nf7woMKAWBgh5FK7PYxPQ=w1000",
      "https://lh3.googleusercontent.com/d/1J46BFTardWXc_E5Cl2ZCzgDR3BtfXjRV=w1000",
      "https://lh3.googleusercontent.com/d/1DKGdE6xukiSxn7amw-iuBX8PACFlybG-=w1000",
      "https://lh3.googleusercontent.com/d/17piS6e3CiEHZYd15ChfHl48n2QnVjn8G=w1000",
      "https://lh3.googleusercontent.com/d/1yuhLOuBhHiFg6ZbU3Kwm39Og29nsE6j6=w1000",
      "https://lh3.googleusercontent.com/d/1KlGRyZ7U4AL4cvRXWR1kraGH54IGf-vQ=w1000",
      "https://lh3.googleusercontent.com/d/1GGLK8PaY9qiP_ZR9QYWCDVRZTslK2JBh=w1000",
      "https://lh3.googleusercontent.com/d/1GFnTmrvTe4K-JGv8CBjsmA7WRonHvCxd=w1000",
      "https://lh3.googleusercontent.com/d/19aCP8tuOZ0kKeOYOnb76nLBeo6whMFre=w1000",
      "https://lh3.googleusercontent.com/d/1v0Brt6HriXQ6PHTsXnI1OOmHMDOTe6X2=w1000",
      "https://lh3.googleusercontent.com/d/1l1rZkXKsMuuSlCm-kzriAerQ2UQQ01FA=w1000",
      "https://lh3.googleusercontent.com/d/1ew8DxvKU1_NGyMbBp2dNE6RO30WKv9r1=w1000",
      "https://lh3.googleusercontent.com/d/1awdJu6GGlVY4L-ZcRxj0Cbfjh4lNM7kx=w1000",
      "https://lh3.googleusercontent.com/d/1B3irrJ6r-zGRE_88vczMMp_Sw_7kUFp4=w1000",
      "https://lh3.googleusercontent.com/d/1yS1lkBlPCDPtLC6W8tubmWllNmI_o1G0=w1000",
      "https://lh3.googleusercontent.com/d/1k1M8fsQcqG50itPppOZb1Grzlnm32-qS=w1000",
      "https://lh3.googleusercontent.com/d/1aGjEbl0RjvEBpTNIgtanXwV_nuCbsfeM=w1000",
      "https://lh3.googleusercontent.com/d/13EPSHpzJQTTAiG99dk1nkLnaVnpMwPie=w1000",
      "https://lh3.googleusercontent.com/d/1---YnvqjvUROsb9xpK_V1djA0aygP9uB=w1000",
      "https://lh3.googleusercontent.com/d/1rjS2ev9M-7e3eoGqZVYt71Fj4CZ-Zo04=w1000",
      "https://lh3.googleusercontent.com/d/1phtbsJgicPP5Utffcmu47gZjzQyD7JcC=w1000",
      "https://lh3.googleusercontent.com/d/1l6aXaiXUSO8MIOygUphdXYi3GWG_czbz=w1000",
      "https://lh3.googleusercontent.com/d/1haMPmPJdkb9vMIguUk55ffwx3Kc_wXk5=w1000",
      "https://lh3.googleusercontent.com/d/1aKmWTxdiHLsPu_FsspMEf1L81wo8O8nF=w1000",
      "https://lh3.googleusercontent.com/d/1OG4OYbL4hR6bDz4sBG5lbkAn_fK1LdLW=w1000",
      "https://lh3.googleusercontent.com/d/1NJM_L8zFDq95xSE5aTD9fJ9s7TJP7NaY=w1000",
      "https://lh3.googleusercontent.com/d/1Fx0rlRfCpiwAtaiX5mGJcAwbLdMNfmXI=w1000",
      "https://lh3.googleusercontent.com/d/1DNVaUK7sl42PO227hqgxTH5GgOnCKAaf=w1000",
      "https://lh3.googleusercontent.com/d/1ByK_MuhtbQdLNdYqwGf2fXch3s7LmrFt=w1000",
      "https://lh3.googleusercontent.com/d/17Gnj16IaOL56bxuP6irlkqooRary13tG=w1000",
      "https://lh3.googleusercontent.com/d/1s4-Wc3SjXI2wT-qJy2r8Wmx-IGSf9RO2=w1000",
      "https://lh3.googleusercontent.com/d/1r7PCAKv1Oph2XVYfMJBdN1hO0eG85fJF=w1000",
      "https://lh3.googleusercontent.com/d/1VxkLoUvCs18W_1huDDA52V-kvkxlKaRG=w1000",
      "https://lh3.googleusercontent.com/d/155udR3LYW4A70L39b8BvBZ0MZ_f_fYZz=w1000",
      "https://lh3.googleusercontent.com/d/1-PEvrq0sY4dcM5yCg23BEpu8dPEfXUvo=w1000",
      "https://lh3.googleusercontent.com/d/1z5dRPZSN4iW6nJ4KvsgA3SX08BqCDyVF=w1000",
      "https://lh3.googleusercontent.com/d/1o1glhXNZA-YigkPIcMOE1dbZWgOlyzQa=w1000",
      "https://lh3.googleusercontent.com/d/1CDtjKNZbTu5o607vbTQC4pN71iDQtX2H=w1000",
      "https://lh3.googleusercontent.com/d/149dm0Xvmycq6X7uOHJ7_H9O6Vn9873Re=w1000",
      "https://lh3.googleusercontent.com/d/1xDqak0KOH8huBdCTKKVMrL13aVWud0Pa=w1000",
      "https://lh3.googleusercontent.com/d/1mMkWpiMv6T-K_slHMg4C9q2uOhdScdjm=w1000",
      "https://lh3.googleusercontent.com/d/18_W78BcPKm6NZM74REBpQYUHYVLoUq2Z=w1000",
      "https://lh3.googleusercontent.com/d/14lCcAu5xTu4N-jEjY-ayS2gBu2nMjP-O=w1000",
      "https://lh3.googleusercontent.com/d/11rqtYWG0gpYMUTwvTQkMwLhBB0xt2w_1=w1000",
      "https://lh3.googleusercontent.com/d/1ofeENir19kA5grKdvdQmucHlu-O7fTwn=w1000",
      "https://lh3.googleusercontent.com/d/1hyFKdGP7ZCCuPWOWOrfUDGzj2t2ds4UF=w1000",
      "https://lh3.googleusercontent.com/d/1dDEwRgwWs8z_WRpn0LSweZ1Ud-GNImAU=w1000",
      "https://lh3.googleusercontent.com/d/1QbqgYbtkfbHtgpO7ziVdixXokqdEE5vM=w1000",
      "https://lh3.googleusercontent.com/d/1DAaNMauPFjeGYwDNlKEHhjCw1ncnI3GL=w1000",
      "https://lh3.googleusercontent.com/d/146xqZsnKNrVKhAc2Ori97Z7IlaLHgCyd=w1000",
      "https://lh3.googleusercontent.com/d/1r4nxTqk0HdnLDJ-6GxtWhPU5gIsPJ1u4=w1000",
      "https://lh3.googleusercontent.com/d/1T8tbDP19OZfPla-yMC_yQzxIY0aPKy__=w1000",
      "https://lh3.googleusercontent.com/d/15vLIV4qlBUf6p1Iz4_OjImFfqAukOJIJ=w1000",
      "https://lh3.googleusercontent.com/d/10Dn--Uu8mU1IL_3pIY0uACeGdbgYdCXC=w1000",
      "https://lh3.googleusercontent.com/d/1txKWO8-rrMJlFLbG9fWiROy8VAExjGvE=w1000",
      "https://lh3.googleusercontent.com/d/1vF_nboMpMK8UMbenr0QNEGUqrEjFIgGQ=w1000",
      "https://lh3.googleusercontent.com/d/18k3qnb57cWvpK63NrXe9PrtJhPaJbDEk=w1000",
      "https://lh3.googleusercontent.com/d/1f65SaUaF_PZ9odWtINuYqcA4JJOqkB6U=w1000",
      "https://lh3.googleusercontent.com/d/12-ObXAHk2YRkji5mgsYSeeYs6aJxsWd3=w1000",
      "https://lh3.googleusercontent.com/d/1pT2Hov2-Nn2HAF1_vKhKtQfZTXHMyw6L=w1000",
      "https://lh3.googleusercontent.com/d/18reA__zSAq8o8rUFYkU61d9dJyeTOpoA=w1000",
      "https://lh3.googleusercontent.com/d/16P8r71CHfVtX7ueYlI5oBBulsoTQ-zl8=w1000",
      "https://lh3.googleusercontent.com/d/1lSYPiptRK0b9GzmBs0cazpMINZRmpKwd=w1000",
      "https://lh3.googleusercontent.com/d/1nsXZwh5ImAYPREqY1BTSeeQJ7adYi3uz=w1000",
      "https://lh3.googleusercontent.com/d/1LwGXdQi1inemzxEbWLZ2BiWfxeF0INBy=w1000",
      "https://lh3.googleusercontent.com/d/1Di6kpdXbnaQmfk-07yphGJVpQNl1Pfdd=w1000",
      "https://lh3.googleusercontent.com/d/1m9e7pi0sDxZnMW5BjapQ1B4DfMIneSTM=w1000",
      "https://lh3.googleusercontent.com/d/1cBSHxLDuVX09M9YIFD0wfCfAiLe068PX=w1000",
      "https://lh3.googleusercontent.com/d/1MlejUBtyIFb5-nclno7gnWwysOXyzTsP=w1000",
      "https://lh3.googleusercontent.com/d/1_36gTQphEbtk6lcsAVHUTiIvfHWTX2su=w1000",
      "https://lh3.googleusercontent.com/d/1l71AnyG-oqLaIPyyQstkX1_qMETN9ucA=w1000",
      "https://lh3.googleusercontent.com/d/15AzKXRPIpSH6kG4HVvFGd1GWfJ0NPQ9G=w1000",
      "https://lh3.googleusercontent.com/d/1lb0vZpdGFCjCB5MoZ_JdeHUn23l4Mes5=w1000",
      "https://lh3.googleusercontent.com/d/1Ikjaye_GCG2FqF7f7_OgQXxx_Ciscj_N=w1000",
      "https://lh3.googleusercontent.com/d/1casrEv7uxAwFfSCqmqXuwOl9Aym4n6K9=w1000",
      "https://lh3.googleusercontent.com/d/1e0fdpN1mvp8uEO_DaUe-FijdSLYP0_Rs=w1000",
      "https://lh3.googleusercontent.com/d/1zSh4hQQjMX9FlO73Nmr8HgfUGLSDfIw2=w1000",
      "https://lh3.googleusercontent.com/d/1Lf9SwFEOgrh-V64DEFSv5Cj9Dw-gJGU5=w1000",
      "https://lh3.googleusercontent.com/d/16OVegk91_goRvAUDa5qywJh9vZm6hcUG=w1000",
      "https://lh3.googleusercontent.com/d/1wi3gftdwB0sIVXF_QBLB18oswxlTvt0O=w1000",
      "https://lh3.googleusercontent.com/d/1hwVdg4uC14bVdw_brEka5j2EkbkC9HjI=w1000",
      "https://lh3.googleusercontent.com/d/1GY0kTY6SqWpvUEwQXo-aYb2xHqF-AvlC=w1000",
      "https://lh3.googleusercontent.com/d/1nqDDUg5eR8rjA8OBiIcHvPoDEN0w7Vzd=w1000",
      "https://lh3.googleusercontent.com/d/1ItezGzmIhhC7dNBQ1OeeptKrMsMraEnx=w1000",
      "https://lh3.googleusercontent.com/d/1uWul63PPjtrLXLwcZp9dVSG7Z4bshJRD=w1000",
      "https://lh3.googleusercontent.com/d/1F-Elfmzmu3CWWXEdqkQdLUrWTYnoDp-V=w1000",
      "https://lh3.googleusercontent.com/d/1TWHVjzxJBIK8Vvs9xh4ehIm6C7CmdAWx=w1000",
      "https://lh3.googleusercontent.com/d/1sklmKsJ8WQzTUZnM2WPu74GKiGk3Yiap=w1000",
      "https://lh3.googleusercontent.com/d/1Jzhxu_3l7wGVTvpUt1Msnb_QwQspY0le=w1000",
      "https://lh3.googleusercontent.com/d/1hB9wUNzYOvb8Cr1NDaHD3BvfTchI2Qbf=w1000",
      "https://lh3.googleusercontent.com/d/1DHpiSqkBiclduPmMxFSdlc4_DYR-bGeg=w1000",
      "https://lh3.googleusercontent.com/d/1nXEkfaSprbbhXeiGi0Ar03AaP3b6QlWU=w1000",
      "https://lh3.googleusercontent.com/d/1QG2YHgriYQ_jp4wmRR1c_Hn7af8mbPiW=w1000",
      "https://lh3.googleusercontent.com/d/1gumlxHVPbAOjz6_jybBdLiPocl82l6U9=w1000",
      "https://lh3.googleusercontent.com/d/1wMerTGUKeAY6tE7kgE4HSYtyhXSdj0GH=w1000",
      "https://lh3.googleusercontent.com/d/1hsc3EGgZ-O3Z5zMZjioP6G_kJOPCy1QU=w1000",
      "https://lh3.googleusercontent.com/d/10JotV08zLrQayo2OK6K8Imr4hIdPKQAQ=w1000",
      "https://lh3.googleusercontent.com/d/1U9aCX5YqsZh8uTxPSuHND63MCrHyx4Ns=w1000",
      "https://lh3.googleusercontent.com/d/18LXLHGfRfGBs5HcmY_Z80agHwEi9xFkU=w1000",
      "https://lh3.googleusercontent.com/d/1WwiDC5chq7nXFy8amL0gU7Tloob_RrRp=w1000",
      "https://lh3.googleusercontent.com/d/112GbunfUgOsDQaaEPqs_SpC7BCyDolOZ=w1000",
      "https://lh3.googleusercontent.com/d/1IXovzG9JEujQR964FG5FLLJV7Vm2yNeI=w1000",
      "https://lh3.googleusercontent.com/d/1O3OLnjFBD4ElU33_kDtxZtisX0kGz7Zw=w1000",
      "https://lh3.googleusercontent.com/d/1vJlc92O0UEbFnrVw1RCrdNBj75Ofwmg7=w1000",
      "https://lh3.googleusercontent.com/d/1EmIxMvTd_qGL9GwkrJffjMVvIN7Im0h6=w1000",
      "https://lh3.googleusercontent.com/d/1fFOogQ2fQOf6gpAz-UCQK-TPzur17-CJ=w1000",
      "https://lh3.googleusercontent.com/d/1Z-v_8SnfnvYjBcv42stLBQR0U1-qcAxr=w1000",
      "https://lh3.googleusercontent.com/d/1r_WHo1agoOXkkvxP7GbOCal_aBSjYLZG=w1000",
      "https://lh3.googleusercontent.com/d/1PIj802gyJcFkXzpe-VCeMZ3xAG89pWQ9=w1000",
      "https://lh3.googleusercontent.com/d/111v-KDSCLRPA8agN3TmfaN23hBmxuqnS=w1000",
      "https://lh3.googleusercontent.com/d/1dJni1tNd87Jh6wnhLyQcucVbpPLU__3A=w1000",
      "https://lh3.googleusercontent.com/d/1n04AbLQ2CRG3szPygda8lnVQQpb99h-7=w1000"
    ],
    videos: [
      { thumbnail: "https://drive.google.com/thumbnail?id=1kB6_wnFaTmwjAUa2Ugiae7Y5-c_8w1_K", url: "https://drive.google.com/file/d/1kB6_wnFaTmwjAUa2Ugiae7Y5-c_8w1_K/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1i8SjzTU1oJygfjwyWZx0MskxALZs57E4", url: "https://drive.google.com/file/d/1i8SjzTU1oJygfjwyWZx0MskxALZs57E4/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1XNCWtyNPCoNpfWQqvojlr-yElTontg8b", url: "https://drive.google.com/file/d/1XNCWtyNPCoNpfWQqvojlr-yElTontg8b/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1vqdqvNRBdMzj7tYiX0djBwOGpOfYzNp9", url: "https://drive.google.com/file/d/1vqdqvNRBdMzj7tYiX0djBwOGpOfYzNp9/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1UqqQIckCiZMIx2zrbHeATLiUy6Aqz5c-", url: "https://drive.google.com/file/d/1UqqQIckCiZMIx2zrbHeATLiUy6Aqz5c-/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=16KLon0-NvGV2Hq0eeHVjbBRKFs87YE6_", url: "https://drive.google.com/file/d/16KLon0-NvGV2Hq0eeHVjbBRKFs87YE6_/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1yXaD7_1oZfolDZPkRB65FZI_4Xc5feM_", url: "https://drive.google.com/file/d/1yXaD7_1oZfolDZPkRB65FZI_4Xc5feM_/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1kfu5DQFONvRPxWHPTiCPCIN28c7DKTA0", url: "https://drive.google.com/file/d/1kfu5DQFONvRPxWHPTiCPCIN28c7DKTA0/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1mOQWHWv1brk5BFPmbPT4BTeguWrZmebT", url: "https://drive.google.com/file/d/1mOQWHWv1brk5BFPmbPT4BTeguWrZmebT/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1Pp-5vNm1y35z4RhxwzE5GMQjeiX7tHnz", url: "https://drive.google.com/file/d/1Pp-5vNm1y35z4RhxwzE5GMQjeiX7tHnz/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1cvMWZS4R9xsKNurBvndtc1nXwXwkjzGc", url: "https://drive.google.com/file/d/1cvMWZS4R9xsKNurBvndtc1nXwXwkjzGc/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1Q80xCFtYqMO89ZQdjzmW5IjqLp1r7boD", url: "https://drive.google.com/file/d/1Q80xCFtYqMO89ZQdjzmW5IjqLp1r7boD/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1E8_f7BIwN6TRLG43HnJ0-Y2bZJN4ywyF", url: "https://drive.google.com/file/d/1E8_f7BIwN6TRLG43HnJ0-Y2bZJN4ywyF/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1uZlZJR7VO7vt9AoSYRGslDzciC-h-cjt", url: "https://drive.google.com/file/d/1uZlZJR7VO7vt9AoSYRGslDzciC-h-cjt/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1uHxgyW8Qg1smgy_xfY1Tnur0IaHkhAvj", url: "https://drive.google.com/file/d/1uHxgyW8Qg1smgy_xfY1Tnur0IaHkhAvj/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1yliUWYgKIkTIx0ujTf-IQOIi96BgvgAK", url: "https://drive.google.com/file/d/1yliUWYgKIkTIx0ujTf-IQOIi96BgvgAK/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1TxupUljcLXIyIRj_J96qRQl9Dcu21_PC", url: "https://drive.google.com/file/d/1TxupUljcLXIyIRj_J96qRQl9Dcu21_PC/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1LDfJZJH78fnzLUjOI5YqOBjJqUXHdUwG", url: "https://drive.google.com/file/d/1LDfJZJH78fnzLUjOI5YqOBjJqUXHdUwG/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1ajAyV8yVCXS2UJ1cv4Pv7r6eeH_bXU86", url: "https://drive.google.com/file/d/1ajAyV8yVCXS2UJ1cv4Pv7r6eeH_bXU86/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1OpZXVHNWAuTDRTX3z9qi-dD19qRJLhAp", url: "https://drive.google.com/file/d/1OpZXVHNWAuTDRTX3z9qi-dD19qRJLhAp/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1ejnTBDgIj9OEyPzfqjqLXlGmTpAjmgSW", url: "https://drive.google.com/file/d/1ejnTBDgIj9OEyPzfqjqLXlGmTpAjmgSW/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=17n98f4of3JRgu8iYCMN7dyiQ_VY5M-Mg", url: "https://drive.google.com/file/d/17n98f4of3JRgu8iYCMN7dyiQ_VY5M-Mg/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=10xIafPJRhpgVk2wGhRJYKimq1jz0MXZ-", url: "https://drive.google.com/file/d/10xIafPJRhpgVk2wGhRJYKimq1jz0MXZ-/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1ZjFjzaqYt1KCOOswcWV5Ze1a1yRkYyD2", url: "https://drive.google.com/file/d/1ZjFjzaqYt1KCOOswcWV5Ze1a1yRkYyD2/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1JVYWcbVCjR3D7VUW1RtKEiyiahZlvtSu", url: "https://drive.google.com/file/d/1JVYWcbVCjR3D7VUW1RtKEiyiahZlvtSu/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1xJddi7RBOX7Z7BBGZ_g1_cjUdy99RukT", url: "https://drive.google.com/file/d/1xJddi7RBOX7Z7BBGZ_g1_cjUdy99RukT/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1ejFyRzTjstm1DmOa9ZBQMyjlneQQ5wra", url: "https://drive.google.com/file/d/1ejFyRzTjstm1DmOa9ZBQMyjlneQQ5wra/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=16BcvNvIena4zWQaFE2NK1jMzQ3p5OlsX", url: "https://drive.google.com/file/d/16BcvNvIena4zWQaFE2NK1jMzQ3p5OlsX/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1W-UWm4d94A4VMkaGI0gSt9aLTOdiVcc6", url: "https://drive.google.com/file/d/1W-UWm4d94A4VMkaGI0gSt9aLTOdiVcc6/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=14j5WrlynDj_KcwMQH2ous5mnVQXRtuBv", url: "https://drive.google.com/file/d/14j5WrlynDj_KcwMQH2ous5mnVQXRtuBv/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1H9m6SGMSJJz17YydOSk72kvlHVrHojqB", url: "https://drive.google.com/file/d/1H9m6SGMSJJz17YydOSk72kvlHVrHojqB/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=10qtnr77L4QtR6aezE4BMQRwebB-fEkCi", url: "https://drive.google.com/file/d/10qtnr77L4QtR6aezE4BMQRwebB-fEkCi/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=12_CfNpTI0cFydKvJDC_vw0s3JYFpMM_t", url: "https://drive.google.com/file/d/12_CfNpTI0cFydKvJDC_vw0s3JYFpMM_t/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1CBo4DNZcGbrq_otGqsUtft5e-dSC4Bvo", url: "https://drive.google.com/file/d/1CBo4DNZcGbrq_otGqsUtft5e-dSC4Bvo/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1Qd9TTzwNKx-9SHQrbm5U9MFbl9MuVFT5", url: "https://drive.google.com/file/d/1Qd9TTzwNKx-9SHQrbm5U9MFbl9MuVFT5/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1dfaIrh2hMAylq6ICWU1JGtmpluhtjSTb", url: "https://drive.google.com/file/d/1dfaIrh2hMAylq6ICWU1JGtmpluhtjSTb/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1CfO2qDuvlK2hdsRBYRgYiTC7yI49h7t0", url: "https://drive.google.com/file/d/1CfO2qDuvlK2hdsRBYRgYiTC7yI49h7t0/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1hE4HRqF03BEMDIFKXljDfVGY2MvMp2Ch", url: "https://drive.google.com/file/d/1hE4HRqF03BEMDIFKXljDfVGY2MvMp2Ch/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1pAm00Gee3xeXbfQ4i_lEk4zbQ5AqiSTy", url: "https://drive.google.com/file/d/1pAm00Gee3xeXbfQ4i_lEk4zbQ5AqiSTy/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1KxUoeTxbXB_4X12EYStzctg-hgnjAG_r", url: "https://drive.google.com/file/d/1KxUoeTxbXB_4X12EYStzctg-hgnjAG_r/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1g4VejjCGJr9tT1ZAvG-w3Nx2DgbmQXND", url: "https://drive.google.com/file/d/1g4VejjCGJr9tT1ZAvG-w3Nx2DgbmQXND/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1PdU5_FIofWL4OvmXrorbtcXI7cRTXIsz", url: "https://drive.google.com/file/d/1PdU5_FIofWL4OvmXrorbtcXI7cRTXIsz/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1VeHk2GA4iOhtqgZzm_8Y9rIsexeAqUjW", url: "https://drive.google.com/file/d/1VeHk2GA4iOhtqgZzm_8Y9rIsexeAqUjW/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1DB9VySqG4mJkD_UBnhrIXCBO6-SLqyGg", url: "https://drive.google.com/file/d/1DB9VySqG4mJkD_UBnhrIXCBO6-SLqyGg/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1MKZWBgMItLiseMjH0noVAfl1TOhzskoX", url: "https://drive.google.com/file/d/1MKZWBgMItLiseMjH0noVAfl1TOhzskoX/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1k0QMSmsCHmNUtryxYECbRfGxtI9sYdH_", url: "https://drive.google.com/file/d/1k0QMSmsCHmNUtryxYECbRfGxtI9sYdH_/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1su9h3KL9zl5hZSF_tAzypo59psj12-k6", url: "https://drive.google.com/file/d/1su9h3KL9zl5hZSF_tAzypo59psj12-k6/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1LzxiUK09hesXd10TjqZBsZJZNwcB9vIp", url: "https://drive.google.com/file/d/1LzxiUK09hesXd10TjqZBsZJZNwcB9vIp/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1QZ9JmnHKD0t8T6OCXiAAQiz8_m_YV997", url: "https://drive.google.com/file/d/1QZ9JmnHKD0t8T6OCXiAAQiz8_m_YV997/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1PJuDifNuCxzIFzjfHel012cjBhPgJQ2p", url: "https://drive.google.com/file/d/1PJuDifNuCxzIFzjfHel012cjBhPgJQ2p/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1Dn70a0hKuQiL6-CONnFql47xCht7ERVY", url: "https://drive.google.com/file/d/1Dn70a0hKuQiL6-CONnFql47xCht7ERVY/preview" },
      { thumbnail: "https://drive.google.com/thumbnail?id=1N1vHgofjDkQO2tGGpy8EPVXgO_EoMU2h", url: "https://drive.google.com/file/d/1N1vHgofjDkQO2tGGpy8EPVXgO_EoMU2h/preview" }
    ],
    materials: [
      { name: "Toolkit Financial Skill", url: "https://drive.google.com/file/d/1UITc2Aw0Bk9OQ5y2YpT_CU1QNQhVNOgI/view?usp=sharing" },
      { name: "Articol presă", url: "https://www.moreto.net/novini.php?n=523435" },
      { name: "Reportaj TeleU", url: "https://youtu.be/fJgMOtZ9Q0A?is=0RyTyw7nATTOIoNt" },
      { name: "Galerie Workshop Liceul Adventist", url: "https://photos.app.goo.gl/4ZXWcmhwwyzKY8wN6" },
      { name: "Galerie Concurs Puterea Cuvântului", url: "https://photos.app.goo.gl/2qYzAExQ9ygrK5wc8" },
      { name: "Postare Instagram 1", url: "https://www.instagram.com/p/DRRtV3_ioII/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
      { name: "Postare Instagram 2", url: "https://www.instagram.com/reel/DRR7FM8lbRe/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
      { name: "Postare Instagram 3", url: "https://www.instagram.com/p/DRuFYXbCZAm/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
      { name: "Postare Instagram 4", url: "https://www.instagram.com/p/DRwnT4KDIOg/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
      { name: "Postare Instagram 5", url: "https://www.instagram.com/p/DRzIFmAiJtX/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" }
    ],
    status: "completed"
  },
  "project-3": {
    title: "Inspire Youth: Leadership in Youth Work",
    projectId: "2024-1-RO01-KA153-YOU-000231210",
    description: "Dezvoltarea leadershipului în lucrul cu tinerii, comunicare eficientă, spirit de echipă și atitudine proactivă în activitățile de tineret.",
    fullDescription: [
      "\"Inspire Youth: Leadership in Youth Work\" a fost un curs de formare Erasmus+ (KA153) dedicat lucrătorilor de tineret, implementat în Craiova, România, de organizația noastră, Today Social Skills, în parteneriat cu Come Pensiamo (Italia), Pangea Youth Association (Turcia), Jong Noord (Țările de Jos) și CET Lituania. Proiectul s-a derulat pe o perioadă de 11 luni, iar mobilitatea principală a avut loc în Craiova, între 13–18 octombrie 2024.",
      "Scopul proiectului a fost dezvoltarea competențelor de leadership ale lucrătorilor de tineret, pentru a crește eficiența și impactul activităților desfășurate în lucrul cu tinerii. 25 de participanți din cele cinci țări au explorat, prin metode de educație nonformală, teme precum stiluri de leadership, comunicare eficientă, lucru în echipă, luarea deciziilor, facilitare și planificare strategică. În timpul cursului, au fost utilizate instrumente digitale precum Kahoot, Mentimeter și Canva, care au sprijinit reflecția și colaborarea.",
      "Impactul proiectului s-a reflectat în creșterea încrederii, a motivației și a atitudinii proactive a participanților, dar și în activitățile de diseminare derulate ulterior: publicarea de povești YouthPass și testimoniale pe site și pe rețelele sociale, organizarea atelierului public \"Târgul ONG-urilor\" în Craiova, precum și sesiuni de multiplicare în comunitățile partenerilor. Rezultatele au fost documentate și recunoscute prin certificările YouthPass, iar o broșură digitală cu experiențele și concluziile cursului este disponibilă pe site-ul Today Social Skills."
    ],
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc02707221f9c49859a2070e5da77a1b1%2Fdedc267d54454254834168425126cb30?format=webp&width=800",
    previewImages: [
      "https://lh3.googleusercontent.com/d/1JoChES_Ss0c--aJru0msyM9j45hzql5n=w1000",
      "https://lh3.googleusercontent.com/d/1TKexiLv9WHKsv7w1agNxZZQfUS-ngUP4=w1000",
      "https://lh3.googleusercontent.com/d/1oxS-vslFCFegOhz0L3RZxMCLJWyO6iL1=w1000"
    ],
    materials: [
      { name: "Comunicat de presă", url: "https://oltenasul.ro/2024/10/18/asociatia-today-social-skills-lanseaza-un-nou-proiect-erasmus-pentru-dezvoltarea-competentelor-de-leadership-in-randul-lucratorilor-de-tineret/" },
      { name: "EN Brochure", url: "https://drive.google.com/file/d/1TI6HSH-ysPEJ4oCZr6xbaH5RelVtBOBF/preview" }
    ],
    status: "completed"
  },
  "project-4": {
    title: "A Journey to Your Future Career",
    projectId: "2023-1-RO01-KA152-YOU-000145540",
    description: "Proiect axat pe descoperirea potențialului personal, dezvoltarea încrederii și identificarea direcției potrivite în carieră pentru tineri.",
    fullDescription: [
      "\"A Journey to Your Future Career\" a fost un schimb de tineri Erasmus+ (KA152) coordonat de Today Social Skills din România, în parteneriat cu Tou.Play (Italia), You Simply Can Foundation (Polonia) și Pangea Youth Association (Turcia). Proiectul s-a derulat între iulie și decembrie 2023, iar mobilitatea principală a avut loc în Craiova, România, în perioada 10–18 octombrie 2023.",
      "Inițiativa a reunit 28 de tineri din cele patru țări, care au participat la activități de educație nonformală dedicate autocunoașterii, orientării profesionale și dezvoltării competențelor pentru viitoarea carieră. Participanții au învățat cum să redacteze un CV, să se pregătească pentru un interviu, să își gestioneze emoțiile și să își crească încrederea în propriile abilități.",
      "Impactul proiectului a depășit grupul de participanți direcți: peste 200 de tineri și lucrători de tineret au fost implicați în activitățile de diseminare locală, regională și europeană. Proiectul a promovat educația nonformală, orientarea în carieră și cooperarea internațională, inspirând alte organizații să dezvolte inițiative similare pentru tineri."
    ],
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc02707221f9c49859a2070e5da77a1b1%2Fa069a5d8382a4f4c9699e6992592c95d?format=webp&width=800",
    previewImages: [
      "https://lh3.googleusercontent.com/d/1SGPhqZkRCczh9hLhvc8zRaR4GJV9LeTa=w1000",
      "https://lh3.googleusercontent.com/d/1KkuZYql60Jf3BgKrU1YyYxleau_X4iPn=w1000",
      "https://lh3.googleusercontent.com/d/1UZHL4ukd8aFuuttveGGDpwUVif9qq2NO=w1000"
    ],
    materials: [
      { name: "RO Broșură", url: "https://drive.google.com/file/d/1QNSz0JR-sQ43CRiDABY7ScDo0JsGgSbP/preview" },
      { name: "EN Brochure", url: "https://drive.google.com/file/d/1AUCdFj9GIACOphjeN548QU2vGseYHudU/preview" },
      { name: "Newsletter 1: CAREER ORIENTATION", url: "https://drive.google.com/file/d/1oBHZNJJmHJ4MgnAe9bHVAOq_EI6fL2QS/preview" },
      { name: "Newsletter 2: Professional Skills", url: "https://drive.google.com/file/d/1hGgXlT7FbixE_o6zMUplWUv6ho14mq4Q/preview" },
      { name: "Newsletter 3: Interviews and Motivation", url: "https://drive.google.com/file/d/1FaTSwoK8zE8AeRV2B5htYjIMgNhTqoI1/preview" }
    ],
    status: "completed"
  },
  "project-5": {
    title: "Voices of the Future: Democracy for Youth",
    projectId: "2025-3-RO01-KA152-YOU-000377897",
    description: "Youth Exchange care reunește tineri din România, Turcia, Lituania și Bulgaria pentru a explora democrația, valorile europene și rolul activ al tinerilor în societate.",
    fullDescription: [
      "\"Voices of the Future: Democracy for Youth\" este un proiect de tip Youth Exchange organizat în Craiova, România, care reunește 28 de tineri din România, Turcia, Lituania și Bulgaria. Proiectul creează un context de învățare non-formală în care participanții explorează democrația, valorile europene și rolul activ al tinerilor în societate.",
      "Pe parcursul mobilității, participanții învață cum funcționează instituțiile Uniunii Europene, analizează importanța implicării civice și își dezvoltă abilități de gândire critică, argumentare și colaborare, prin activități practice precum dezbateri, simulări și exerciții interactive.",
      "Proiectul urmărește să crească nivelul de conștientizare privind participarea democratică, să dezvolte competențe esențiale pentru cetățenie activă și să încurajeze tinerii să devină promotori ai valorilor europene în comunitățile lor."
    ],
    image: "https://cdn.builder.io/api/v1/image/assets%2Fc02707221f9c49859a2070e5da77a1b1%2F63896dd737db49c08642a2c9f03191bb?format=webp&width=800&height=450",
    previewImages: [],
    materials: [
      { name: "Info Pack", url: "https://drive.google.com/file/d/1saBoXEgmqCLVuepfV7kqfiEBX3BPIKzh/view" }
    ],
    status: "coming_soon"
  }
};

// Dissemination data
const disseminationData: Record<string, {
  title: string;
  photos: string[];
  videos: { thumbnail: string; url: string }[];
}> = {
  "project-5": {
    title: "Voices of the Future: Democracy for Youth",
    photos: [],
    videos: []
  },
  "project-1": {
    title: "E-Youth Work – Digitalize & Engage Youth",
    photos: [
      "https://lh3.googleusercontent.com/d/1SyLuCG104IRZGavQFKNXrbZEj1EbTEHx=w800",
      "https://lh3.googleusercontent.com/d/1Jc8MLNk5WJhXCC24Hwu4CK6MhdYE3y45=w800",
      "https://lh3.googleusercontent.com/d/1fZjn3ItzwHlRWs3VpvEjtVqxc6YLQEgC=w800",
      "https://lh3.googleusercontent.com/d/1tS7fdRrf0RxmcGqVwskW-TqZyg5VFkuO=w800",
      "https://lh3.googleusercontent.com/d/1U451N5L5O1_9iOdxS2t52QY44Sav8tTL=w800",
      "https://lh3.googleusercontent.com/d/18UhdWQuX2pvWwpCvNQsQDMhFNWkIlsFS=w800",
      "https://lh3.googleusercontent.com/d/1PCERJNbGy7S3-rfFNMGSVxXQ6kPXKQsc=w800",
      "https://lh3.googleusercontent.com/d/1qhn79dDLpgb0Pc5Jc3cY7FFiPV1P0aXZ=w800",
      "https://lh3.googleusercontent.com/d/1P66Lu0MFaU5O9ddl3ippln1_TfD68q7g=w800",
      "https://lh3.googleusercontent.com/d/1gg3YkKRhzDAcLfIcR7Aya3UbDRaoDOAk=w800",
      "https://lh3.googleusercontent.com/d/1eP2sT3hRQkZfeaRub1kju-oDj9u3axpT=w800",
      "https://lh3.googleusercontent.com/d/1s7BkvM-X_HeFbHyLPBi8RIBEAKPoiJ1N=w800",
      "https://lh3.googleusercontent.com/d/1bg3ZXTafMPdbkRm8RGIP6Q_LdEwLv50Q=w800",
      "https://lh3.googleusercontent.com/d/167I4IQW03R81JOsSVkJEpwp1D21-pylP=w800",
      "https://lh3.googleusercontent.com/d/1DcUi4uJetXnasQxOFzE4ubUmpWe6znpj=w800",
      "https://lh3.googleusercontent.com/d/1Wyt1FbORxr1p7c37aVYTcq3Us8jfUYak=w800",
      "https://lh3.googleusercontent.com/d/1GGphenw3hPkGMeicFahDKsWHU5VjBSUV=w800",
      "https://lh3.googleusercontent.com/d/1aEXUzTQcLyFS-RvqlRURUCW9eZyyZbuj=w800",
      "https://lh3.googleusercontent.com/d/1ab-R8D319OBrMh-DiiiM_vkaCX04RmpG=w800",
      "https://lh3.googleusercontent.com/d/18kbXAXFVXAR7FaEcel59-e9S65SqQ8Bx=w800",
      "https://lh3.googleusercontent.com/d/1JjQRJQc5PoYcEu9YOP0rgSFjpEJp68nz=w800",
      "https://lh3.googleusercontent.com/d/12XMmDfm0KUxxAr3-POVrnKs-tuxrnBub=w800",
      "https://lh3.googleusercontent.com/d/1v-M9Y-lob75ku35C1q6EnOE7rP8-FvWD=w800",
      "https://lh3.googleusercontent.com/d/1Ct3VBhWqwz-fsozch-6vdP0rIEkWrJrH=w800",
      "https://lh3.googleusercontent.com/d/1z49ZRu_Mgdu9YWjoCTp72mQ2U6G5Ga3l=w800",
      "https://lh3.googleusercontent.com/d/1Z8xxESMFPAZglwG1_vfZrGc-28Fkx5Iz=w800",
      "https://lh3.googleusercontent.com/d/1HXMYok9tnHtn3Dr_kdzCiTFNLU3_qp-3=w800",
      "https://lh3.googleusercontent.com/d/1IOx1ZKWJevKHZd3hu0_aIYb-jwL4_Ucv=w800",
      "https://lh3.googleusercontent.com/d/1F89sTJzUCoVR1JqyZJekF9ToWw_GCjKX=w800",
      "https://lh3.googleusercontent.com/d/1squF_iw9mnIVJCfFKewx01ASKXOqK2MG=w800",
      "https://lh3.googleusercontent.com/d/1bBHwAzfN3gO8KDRUyw_GJrWtfRG8ZdgF=w800"
    ],
    videos: [
      { thumbnail: "https://lh3.googleusercontent.com/d/1FGFAFvKIPXx8cwIeFpMFAMCTJxGAxik0=w400", url: "https://drive.google.com/file/d/1FGFAFvKIPXx8cwIeFpMFAMCTJxGAxik0/preview" },
      { thumbnail: "https://lh3.googleusercontent.com/d/10Y8mM-OnGluj7pYl8gINZQFsnIrF8AJE=w400", url: "https://drive.google.com/file/d/10Y8mM-OnGluj7pYl8gINZQFsnIrF8AJE/preview" },
      { thumbnail: "https://lh3.googleusercontent.com/d/1zM5peikNReOp_u7mTV_d0J8wjiX-Wicg=w400", url: "https://drive.google.com/file/d/1zM5peikNReOp_u7mTV_d0J8wjiX-Wicg/preview" },
      { thumbnail: "https://lh3.googleusercontent.com/d/1Y7ZwC1RjIFiBS4Orpe4wdtYD-f9yndTK=w400", url: "https://drive.google.com/file/d/1Y7ZwC1RjIFiBS4Orpe4wdtYD-f9yndTK/preview" },
      { thumbnail: "https://lh3.googleusercontent.com/d/1c7h3AzFrq0bZT6gp3LDm8qwMdGGMF2fc=w400", url: "https://drive.google.com/file/d/1c7h3AzFrq0bZT6gp3LDm8qwMdGGMF2fc/preview" }
    ]
  },
  "project-2": {
    title: "Shape the Future: Youth Financial Skills",
    photos: [
      "https://lh3.googleusercontent.com/d/1UvQD6dsvi_Rbhmx7LYMhAqZd_mi0xoHe=w1000",
      "https://lh3.googleusercontent.com/d/1V1A8_uLA2aEd2wHnSHSS_8MHLcPk8XAJ=w1000",
      "https://lh3.googleusercontent.com/d/1utDPNuSICz1JRHGt9ov_uIQ0qanuDog8=w1000",
      "https://lh3.googleusercontent.com/d/1392QPfne98I53K6YVRKc_LmhYXYobnHX=w1000",
      "https://lh3.googleusercontent.com/d/1w0qeFv90viShRsVvpG3FLOZDjBME1XuI=w1000",
      "https://lh3.googleusercontent.com/d/1jv2TGr1AV-i_M0c06cdrj24-QtamYbbW=w1000",
      "https://lh3.googleusercontent.com/d/1-P4KoEFvg7kM_SR3KYT054WeUq4uH8Zf=w1000",
      "https://lh3.googleusercontent.com/d/1R2IJn4_GxaJTODd5pn0QSlS4UFxwZemw=w1000",
      "https://lh3.googleusercontent.com/d/1lwTgKmAJkbZpkv4ie_e8JkzJoegGqzPu=w1000",
      "https://lh3.googleusercontent.com/d/1viJZTS1s0IPlhltyt2K9VSJ99f2rRxcf=w1000",
      "https://lh3.googleusercontent.com/d/1QIOXl2_1K1BJgs11DPV5EdO57i9AZ4az=w1000",
      "https://lh3.googleusercontent.com/d/1FMfNy2arvea-NwAUTOpd5Dbm1eWT5bMx=w1000",
      "https://lh3.googleusercontent.com/d/1vJ_EffsQ05pTxPNNzQR5abjUB7YtQF8K=w1000",
      "https://lh3.googleusercontent.com/d/1rr-50eAsvwQ6IdwjkCrYhprPqI_3xlIT=w1000",
      "https://lh3.googleusercontent.com/d/1ILYO9cojoIsjjPIDYRQNkLltunpLO-8V=w1000",
      "https://lh3.googleusercontent.com/d/1kk_FuhxYr9vNa7B2_0NlA4cNWpvAMOm5=w1000",
      "https://lh3.googleusercontent.com/d/1Bb-S-8aXRVI-Hf1eEjceifuERtesbOGR=w1000",
      "https://lh3.googleusercontent.com/d/1edqJVQTtGusY8KbcqOmgeU8rNTVK130N=w1000",
      "https://lh3.googleusercontent.com/d/1mqsRyuNXPw8bs_fRQHWdBl0jh164rSZV=w1000",
      "https://lh3.googleusercontent.com/d/1GIEvFPiuZhKgeAmp-LF9rkQNvnBMBWhD=w1000"
    ],
    videos: []
  },
  "project-3": {
    title: "Inspire Youth: Leadership in Youth Work",
    photos: [
      "https://lh3.googleusercontent.com/d/14Xd2rC74BKAC9YwhJ-X3J6ksOc6Pe8FQ=w1000",
      "https://lh3.googleusercontent.com/d/1WpzGty8VR9r1WdUpPgu-kRWKTeBTU2h9=w1000",
      "https://lh3.googleusercontent.com/d/1LECgYWLQ877HDZyGWmVml5aW32_PNYMf=w1000",
      "https://lh3.googleusercontent.com/d/1Pkpe62DOdTNQk6UjHJtLX_sdu3D5e9jP=w1000",
      "https://lh3.googleusercontent.com/d/1oPItyhEWX_zUluVJT7YoCqD8T7EvunrB=w1000",
      "https://lh3.googleusercontent.com/d/128WUc3s1Rux05-Pr0fGMuA75RLZyXp59=w1000",
      "https://lh3.googleusercontent.com/d/1vMtvY6nTmusB2A9Sno-ye9j0mF4fU6qD=w1000",
      "https://lh3.googleusercontent.com/d/1XnFoX6qBAYY4VhonYDhCvtNUeZgyNq1s=w1000",
      "https://lh3.googleusercontent.com/d/1v13fe5AJHsMiRohXIsYRsb8pPS0Y1QRt=w1000",
      "https://lh3.googleusercontent.com/d/1NrCh5PnNePB7Zs5HpPLIplzOfYN6O_2o=w1000",
      "https://lh3.googleusercontent.com/d/1ukieRdR9HBB_qaWVWCU40-IMaUFY5zW5=w1000",
      "https://lh3.googleusercontent.com/d/1-mYVsYUImtDvbAByGvfnY7YdS5QUeTK-=w1000",
      "https://lh3.googleusercontent.com/d/1wZ__22RX1rvbOpKJ1_mLkJXNI1r78iH9=w1000",
      "https://lh3.googleusercontent.com/d/1IMzY3VjOW2BtU_DZFx0Esk-pq63MZ6qx=w1000",
      "https://lh3.googleusercontent.com/d/19PQhAdoZ8ga2NXHHUpKjo73QijwHUpVn=w1000"
    ],
    videos: []
  },
  "project-4": {
    title: "A Journey to Your Future Career",
    photos: Array(5).fill("/placeholder.svg"),
    videos: []
  }
};

function StatusBadge({ status }: { status: "ongoing" | "completed" | "coming_soon" }) {
  if (status === "ongoing") {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 text-brand-orange text-sm font-medium">
        <Clock className="w-4 h-4" />
        <span>În Desfășurare</span>
      </div>
    );
  }
  if (status === "coming_soon") {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-medium">
        <Clock className="w-4 h-4" />
        <span>În curând...</span>
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 text-brand-green text-sm font-medium">
      <CheckCircle className="w-4 h-4" />
      <span>Finalizat</span>
    </div>
  );
}

export default function ErasmusProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const project = projectId ? projectsData[projectId] : null;
  const dissemination = projectId ? disseminationData[projectId] : null;

  const handleCollapse = () => {
    setIsExpanded(false);
    // Scroll to the description after state updates
    setTimeout(() => {
      descriptionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  if (!project) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container py-32 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Proiect negăsit</h1>
          <Link to="/erasmus" className="text-brand-blue hover:underline">
            Înapoi la proiecte ERASMUS+
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-28 pb-12 bg-gradient-to-br from-brand-blue/10 via-background to-brand-indigo/5 overflow-hidden"
      >
        <div className="container relative z-10">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-6"
          >
            <Link
              to="/erasmus"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand-blue transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Înapoi la proiecte ERASMUS+
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-medium">
                <span>ID: {project.projectId}</span>
              </div>
              <StatusBadge status={project.status} />
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {project.title}
            </h1>
          </motion.div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-indigo/10 rounded-full blur-3xl" />
      </section>

      {/* Hero Image Section */}
      <section className="bg-background">
        <div className="container py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-lg h-80 md:h-96 lg:h-[500px]"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <motion.div
                ref={descriptionRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">Despre Proiect</h2>
                <div className="space-y-4">
                  {/* Mobile: Show first paragraph with expand option */}
                  <div className="md:hidden">
                    <p className="text-muted-foreground leading-relaxed">
                      {project.fullDescription[0]}
                    </p>
                    {!isExpanded && project.fullDescription.length > 1 && (
                      <button
                        onClick={() => setIsExpanded(true)}
                        className="inline-flex items-center gap-1 mt-3 text-brand-blue font-medium hover:underline"
                      >
                        Vezi mai mult
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    )}
                    {isExpanded && (
                      <div className="space-y-4 mt-4">
                        {project.fullDescription.slice(1).map((paragraph, index) => (
                          <p key={index + 1} className="text-muted-foreground leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                        <button
                          onClick={handleCollapse}
                          className="inline-flex items-center gap-1 mt-3 text-brand-blue font-medium hover:underline"
                        >
                          Vezi mai puțin
                          <ChevronDown className="w-4 h-4 rotate-180" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Desktop: Show all paragraphs */}
                  <div className="hidden md:block space-y-4">
                    {project.fullDescription.map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Photo Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Images className="w-6 h-6 text-brand-blue" />
                    Foto-Video din activitate
                  </h2>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  {project.previewImages.slice(0, 3).map((img, i) => (
                    <motion.div
                      key={`img-${i}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="group aspect-square rounded-xl overflow-hidden bg-secondary cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2"
                      onClick={() => setSelectedImage(img)}
                    >
                      <img src={img} alt={`Preview ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </motion.div>
                  ))}
                </div>

                <Link
                  to={`/erasmus/${projectId}/galerie`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <Button variant="outline" className="gap-2">
                    Vezi mai mult
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>

              {/* Dissemination Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Share2 className="w-6 h-6 text-brand-green" />
                    Diseminare
                  </h2>
                </div>

                {dissemination && dissemination.photos.length > 0 && !dissemination.photos[0].includes("placeholder") ? (
                  <>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {dissemination.photos.slice(0, 3).map((img, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          className="group aspect-square rounded-xl overflow-hidden bg-secondary cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2"
                          onClick={() => setSelectedImage(img)}
                        >
                          <img src={img} alt={`Dissemination ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </motion.div>
                      ))}
                    </div>

                    <Link
                      to={`/erasmus/${projectId}/diseminare`}
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <Button variant="outline" className="gap-2">
                        Vezi mai mult
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </>
                ) : (
                  <div className="bg-brand-green/5 rounded-xl p-8 border border-brand-green/20 text-center">
                    <p className="text-muted-foreground text-lg">Diseminarea va fi adăugată în curând...</p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* EU Funding Notice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-brand-blue/5 rounded-2xl p-6 border border-brand-blue/20"
              >
                <img
                  src={cofundedByEu}
                  alt="Cofinanțat de Uniunea Europeană"
                  className="h-10 object-contain mb-3"
                />
                <p className="text-sm text-muted-foreground">
                  Proiect finanțat de Uniunea Europeană prin programul ERASMUS+
                </p>
              </motion.div>

              {/* Materials */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-card rounded-2xl p-6 shadow-card"
              >
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand-orange" />
                  Materiale
                </h3>

                {project.materials.length > 0 ? (
                  <ul className="space-y-2">
                    {project.materials.map((material, i) => (
                      <li key={i}>
                        <a
                          href={material.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-blue hover:text-brand-blue/80 font-medium text-sm block py-1 transition-colors"
                        >
                          {material.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Materialele vor fi adăugate în curând.
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={selectedImage}
              alt="Full size"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
