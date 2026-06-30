import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, X, Image as ImageIcon, Video, Play } from "lucide-react";

// Placeholder dissemination data
const disseminationData: Record<string, {
  title: string;
  photos: string[];
  videos: { thumbnail: string; url: string }[];
}> = {
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
      {
        thumbnail: "https://lh3.googleusercontent.com/d/1FGFAFvKIPXx8cwIeFpMFAMCTJxGAxik0=w400",
        url: "https://drive.google.com/file/d/1FGFAFvKIPXx8cwIeFpMFAMCTJxGAxik0/preview"
      },
      {
        thumbnail: "https://lh3.googleusercontent.com/d/10Y8mM-OnGluj7pYl8gINZQFsnIrF8AJE=w400",
        url: "https://drive.google.com/file/d/10Y8mM-OnGluj7pYl8gINZQFsnIrF8AJE/preview"
      },
      {
        thumbnail: "https://lh3.googleusercontent.com/d/1zM5peikNReOp_u7mTV_d0J8wjiX-Wicg=w400",
        url: "https://drive.google.com/file/d/1zM5peikNReOp_u7mTV_d0J8wjiX-Wicg/preview"
      },
      {
        thumbnail: "https://lh3.googleusercontent.com/d/1Y7ZwC1RjIFiBS4Orpe4wdtYD-f9yndTK=w400",
        url: "https://drive.google.com/file/d/1Y7ZwC1RjIFiBS4Orpe4wdtYD-f9yndTK/preview"
      },
      {
        thumbnail: "https://lh3.googleusercontent.com/d/1c7h3AzFrq0bZT6gp3LDm8qwMdGGMF2fc=w400",
        url: "https://drive.google.com/file/d/1c7h3AzFrq0bZT6gp3LDm8qwMdGGMF2fc/preview"
      }
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
    videos: [
      {
        thumbnail: "https://lh3.googleusercontent.com/d/166n2YAaWCqCdEh2V6R_ijyEGz7Na7b2_=w1000",
        url: "https://drive.google.com/file/d/166n2YAaWCqCdEh2V6R_ijyEGz7Na7b2_/preview"
      }
    ]
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

export default function ErasmusDissemination() {
  const { projectId } = useParams<{ projectId: string }>();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");

  const dissemination = projectId ? disseminationData[projectId] : null;

  if (!dissemination) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container py-32 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Pagină negăsită</h1>
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
        className="relative pt-28 pb-8 bg-gradient-to-br from-brand-blue/10 via-background to-brand-indigo/5"
      >
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <Link
              to={`/erasmus/${projectId}`}
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand-blue transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Înapoi la proiect
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Diseminare
            </h1>
            <p className="text-muted-foreground">{dissemination.title}</p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("photos")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "photos"
                  ? "bg-brand-blue text-white"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
            >
              <ImageIcon className="w-4 h-4" />
              Fotografii ({dissemination.photos.length})
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "videos"
                  ? "bg-brand-blue text-white"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
            >
              <Video className="w-4 h-4" />
              Video ({dissemination.videos.length})
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-background">
        <div className="container">
          {activeTab === "photos" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {dissemination.photos.map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group aspect-square rounded-xl overflow-hidden bg-secondary cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2"
                  onClick={() => setSelectedImage(photo)}
                >
                  <img
                    src={photo}
                    alt={`Dissemination photo ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dissemination.videos.map((video, i) => (
                <motion.a
                  key={i}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="group relative aspect-video rounded-xl overflow-hidden bg-secondary shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  <img src={video.thumbnail} alt={`Video ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-brand-blue ml-1" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
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
