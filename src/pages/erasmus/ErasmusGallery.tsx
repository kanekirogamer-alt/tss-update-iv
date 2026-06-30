import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, X, Play, Image as ImageIcon, Video } from "lucide-react";

// Placeholder gallery data
const galleryData: Record<string, {
  title: string;
  photos: string[];
  videos: { thumbnail: string; url: string }[];
}> = {
  "project-1": {
    title: "E-Youth Work – Digitalize & Engage Youth",
    photos: [
      "https://lh3.googleusercontent.com/d/1w1M3olLf6JFTyyagl6DQpcJKAXkPj_-A=w1000",
      "https://lh3.googleusercontent.com/d/1AwBiMjsRWtndV6HPnV-GlkqhTBbZsDDP=w1000",
      "https://lh3.googleusercontent.com/d/1H2w_1mN-XMyiesMnIGEx11G08U7dnpDp=w1000",
      "https://lh3.googleusercontent.com/d/1cET_lqlF3TdBcPv_bigAqccstSYCEJXj=w1000",
      "https://lh3.googleusercontent.com/d/13WBsizRMp28rDnR8ZhmIDE8VOMrmM9nj=w1000",
      "https://lh3.googleusercontent.com/d/15itjIfJBYygy1dJOXQWv5CGpX9zVV_Ju=w1000",
      "https://lh3.googleusercontent.com/d/1IP8W8MHlAos4feM565jOngmzpQPRiySy=w1000",
      "https://lh3.googleusercontent.com/d/1l9H7WVi3zeodGnOR3W7fP_ffpDhR_Soo=w1000"
    ],
    videos: []
  },
  "project-2": {
    title: "Shape the Future: Youth Financial Skills",
    photos: [
      "https://drive.google.com/thumbnail?id=1Q1IkUAz1l4900MpeUoCGGwkmMmD64_Ud",
      "https://drive.google.com/thumbnail?id=13PqHOJWwbrY0IycKPl48Tb5fwXFxADbI",
      "https://drive.google.com/thumbnail?id=1F_YSzxS-zcMsk6qwhr5lgCX9TEKgOztC",
      "https://drive.google.com/thumbnail?id=1YS6ngCN0HLidiWKRnr9tpZQh6_ToETuI",
      "https://drive.google.com/thumbnail?id=1HWcKtBrQ0ZEb0BQSuTACYlUxnTK1S4Uh",
      "https://drive.google.com/thumbnail?id=14Trk6aqYJYj4PV3wai0Je0LSbLHiTLoa",
      "https://drive.google.com/thumbnail?id=1uCiLGT1EqyBWoscUSw1QPlh8mTsfpWz6",
      "https://drive.google.com/thumbnail?id=1lkmoRfnvawbJs4kp0i7pVVDPLNv6HY0S",
      "https://drive.google.com/thumbnail?id=1QCQfR6bAuustb7qWXoAVuf_zgVXTHsP5",
      "https://drive.google.com/thumbnail?id=1JJOAInIpJhWNXyL0L4E2zPd5DggQb_Yk",
      "https://drive.google.com/thumbnail?id=1esuIIQTiXc4ApEKr60lDaXLNfkM_l0a4",
      "https://drive.google.com/thumbnail?id=1BFoOAkt6pZ8jX5DTJdgJcL6VNAp-gNxt",
      "https://drive.google.com/thumbnail?id=1K59HqTDajzS572Dy8nKUA5JQLz0RwH_n",
      "https://drive.google.com/thumbnail?id=1YoprMgxh3F_bSApSIRp8K6kII4LfTOFG",
      "https://drive.google.com/thumbnail?id=1CAXDEcMF4GA-5UrV0kPjZUZkxToaJZQu",
      "https://drive.google.com/thumbnail?id=1n9OmDTRUuSJcDCY6TDJ46A0YDW6mH1gl",
      "https://drive.google.com/thumbnail?id=1GJKzZ0sWyM6IxaZI_3OuPqw2Q5N5bwm4",
      "https://drive.google.com/thumbnail?id=1OkKs4-zgpyapYETg0nxxg3JnrIce7T2X",
      "https://drive.google.com/thumbnail?id=1aab7MRuBjS0TCwdWLiqWQ-phFuWfAP0W",
      "https://drive.google.com/thumbnail?id=1UnLFf7N-rg4z2vwsODQbPGObrc_pWlb9",
      "https://drive.google.com/thumbnail?id=13UnB9gLDpacrMDm9sqbrQVH57DzfL-bX",
      "https://drive.google.com/thumbnail?id=1sUXcpmhCMvY2wvAEzHGGKYItWGezNoj9",
      "https://drive.google.com/thumbnail?id=1KlkFNEE5GqIp2TL7TNcCfGAyWj3JsApF",
      "https://drive.google.com/thumbnail?id=1dhfSwu4O61vFxmQ0tA2RaNnueEfHoXRa",
      "https://drive.google.com/thumbnail?id=1HhrsUnpDuC-UCqmdAfpbS-VqylK-TP09",
      "https://drive.google.com/thumbnail?id=1s7z73452a3hgNLlZN2RZN-3vTgeVYuJt",
      "https://drive.google.com/thumbnail?id=1p5v6tpmAGmbLD5rOXD4GV98Y3ceeaUKc",
      "https://drive.google.com/thumbnail?id=1U7AUw0UQySLBwIQ2nKSnak_7O5qE8taU",
      "https://drive.google.com/thumbnail?id=1tVvQZlqb_PI7wtsEyLM-Gya10C9Huyyx",
      "https://drive.google.com/thumbnail?id=1dESFeVgxlO7yXNid2y3SeXyjghMr2xVm",
      "https://drive.google.com/thumbnail?id=1HCCGYCnNXg6PuqC1XYlS-gyZZy2r4fx2",
      "https://drive.google.com/thumbnail?id=1k3jK_DIOLPZMMNOWwP5TvSaJG3FJPkCm",
      "https://drive.google.com/thumbnail?id=1C4s1APnI_jBV9AzXQoNnA2-mtPgm3ocN",
      "https://drive.google.com/thumbnail?id=1-dJmBqGmxkGELmBrkCy84kNBFptJc_jq",
      "https://drive.google.com/thumbnail?id=1xrg4UHa_TRtidSvpnF6ZJ-sj79rM7xFU",
      "https://drive.google.com/thumbnail?id=1fB_ydf4e4YPcl_6U_nxrfZhwTTuea9Y0",
      "https://drive.google.com/thumbnail?id=1c4nftzhoy_3z20w0hyxLJrBcCpGVyAXK",
      "https://drive.google.com/thumbnail?id=1GX5oVdrWA-DBKsLUCj8XauuFihbhbvvB",
      "https://drive.google.com/thumbnail?id=1jvtg2HZKUPEnHq_ucaDJ-RRDwn0dWRmj",
      "https://drive.google.com/thumbnail?id=1tMrMAKhEx0sJ_KtnwcDjjnHFuNcuD2c0",
      "https://drive.google.com/thumbnail?id=1hkku2lJhOH8jxnh4HPOyiqlI9-cIovT3",
      "https://drive.google.com/thumbnail?id=1lRJfgz_Eaod2unNuAfmDYZslvJsnRcY8",
      "https://drive.google.com/thumbnail?id=1jlBaroVAzTd4827eQYulN8gzQjwlZLcE",
      "https://drive.google.com/thumbnail?id=1c1_EBqXfMc8zK_3vyytbS-idVf3Zm7ZX",
      "https://drive.google.com/thumbnail?id=1GbjgPclZuQN2f9HfyX-X3vYoeGV9wgDN",
      "https://drive.google.com/thumbnail?id=1CyzsUHN0cahQ1e1rbo6jqVvmF0ZAoJpl",
      "https://drive.google.com/thumbnail?id=1UxcFMCn6xslxvdYFYvaujd4OBSbNAmQj",
      "https://drive.google.com/thumbnail?id=1xx6chIVs4UrD3NrHJktCr9Ee62MSpNZ_",
      "https://drive.google.com/thumbnail?id=1-Lwx4wgyEd_FmQRzLlrx92NxGkbPs868",
      "https://drive.google.com/thumbnail?id=1xrGN6pODy7AzN_cEUt7BB1V71EAsFdne",
      "https://drive.google.com/thumbnail?id=1inqrhXR7XsuyQsFFERbGN-aQn3aX9X7c",
      "https://drive.google.com/thumbnail?id=1yaR9K0Ehwmr7-nT47c4H0A6oOurVFvNO",
      "https://drive.google.com/thumbnail?id=1aiXrQ5l5EEHmsG1K1nqYeKA9_SFbUZTx",
      "https://drive.google.com/thumbnail?id=1tHFXsPAHjEickBxt4NE_q4Sftqclxa07",
      "https://drive.google.com/thumbnail?id=1iIwMgVfjlmPXkzpNMW0ZjPZqw7azxQR6",
      "https://drive.google.com/thumbnail?id=1qPwpZxM1r7bhvvZGIYR_45EUmchuhXcc",
      "https://drive.google.com/thumbnail?id=1WOvZT1eXMT9HpgkFWjGnenJXRz-liud1",
      "https://drive.google.com/thumbnail?id=1ujebIpOB8jg5vSsEhZTYjEA6TPLkMzlJ",
      "https://drive.google.com/thumbnail?id=11OoZ4MRQPttvih7nceUtDWtNf2FVpxFQ",
      "https://drive.google.com/thumbnail?id=10sGgJ9pFs8pxGhJdNBikfWmn5-WgRLYm",
      "https://drive.google.com/thumbnail?id=10E1lzLxHoAK6V0wFsXvhorXRM3HcPY6a",
      "https://drive.google.com/thumbnail?id=1Fm-966Ukr5brLoprDrDx7J9-41N6pQva",
      "https://drive.google.com/thumbnail?id=150lcRyBfWAfq9M3Q78CLgQNLWCt0c06d",
      "https://drive.google.com/thumbnail?id=1f4zbG8C0qJWVfpNgRWH0ll5RROg0Jvof",
      "https://drive.google.com/thumbnail?id=1h_6BYFLJzmpGoSNYPkfESbfqvXCbTOC9",
      "https://drive.google.com/thumbnail?id=1Z-SieC7eIEt9S-1e7QIJXeQkQUNyTSpA",
      "https://drive.google.com/thumbnail?id=1sreYtftX5itOzi_VkcHLwYi1QtFWk2XM",
      "https://drive.google.com/thumbnail?id=1Ep1TUjiFYRDEPIZnn7_OdtIr00LHis6d",
      "https://drive.google.com/thumbnail?id=1WfI08ZkB6DaaiUrBKUtg7v2WpDUEWajf",
      "https://drive.google.com/thumbnail?id=1wm7skLP787rtClaxw0H9Up8l9YsblX_H",
      "https://drive.google.com/thumbnail?id=1TuYzO0ZsyrlHFSjvUmxJ8FGMShn1v3KQ",
      "https://drive.google.com/thumbnail?id=1_8Gb5U2epxbMYUHmoXNGjTYMsYqKwnTZ",
      "https://drive.google.com/thumbnail?id=19P_0qnylul00v0kmOoEHfY2Z_hRDmzCt",
      "https://drive.google.com/thumbnail?id=1G5baCNFtm7fLKq5S_yPXo_fIPAOXF5lV",
      "https://drive.google.com/thumbnail?id=1612yDSsxKWjGlo7qzom-9l2YvDs7DNjH",
      "https://drive.google.com/thumbnail?id=1yuoAS3nei6Wmlg3h31a6XF7I79AeTqj8",
      "https://drive.google.com/thumbnail?id=1hhQP8tH2WPPxVm_lQobof8-f2D3DsQqz",
      "https://drive.google.com/thumbnail?id=1dKyfsh48JwGQdERTY-i2-ScMmTrZseqG",
      "https://drive.google.com/thumbnail?id=1wGgZ5Y91FiKrfH_tjy2_6T8-jhgjyngi",
      "https://drive.google.com/thumbnail?id=1YO6aq9J0Lx2-29r4oosBEz1bQqwfUNlw",
      "https://drive.google.com/thumbnail?id=1KP_fDX8ZBLCkAXKiHAbYHqLWdjqta-vu",
      "https://drive.google.com/thumbnail?id=1R2U3eRtxjCZkJrQ-vJNYTacEs3s8gVTU",
      "https://drive.google.com/thumbnail?id=1ANtK1_SkBlf8rpXMP6welDW6x5wkx0gk",
      "https://drive.google.com/thumbnail?id=13ULkNq2zfDDJa7QVGY7-KXKtNUfHUO-d",
      "https://drive.google.com/thumbnail?id=1nUOnnIl7wqVilN9tuPQmacJ5OvehUtwv",
      "https://drive.google.com/thumbnail?id=1tJr6wOGXeV5hw3pMc96hwk4yfzPB6k5j",
      "https://drive.google.com/thumbnail?id=1AyyWU5-KbFgPyiQsrPou4OKRCXEd2QVs",
      "https://drive.google.com/thumbnail?id=1KjVSS_8_BtMu6Ab7Lr5v0QgwubgYXM5O",
      "https://drive.google.com/thumbnail?id=1icD6AwVKOz2D8MKQrRH8f186_iVHn578",
      "https://drive.google.com/thumbnail?id=1FmIrgCLVwBvxweupp6Ro25ZEsOS26utQ",
      "https://drive.google.com/thumbnail?id=1j5ciuR56KEvRvzYIwl4E863eqmCSXsyz",
      "https://drive.google.com/thumbnail?id=13hzMYhMEZJGPlOH8PtR3nDVY6dL7Gfu3",
      "https://drive.google.com/thumbnail?id=1aaz-YWigmk0JJW3Oeh_iTdWjpyFRhsNq",
      "https://drive.google.com/thumbnail?id=1MqVrQrBr5qm7n0Lti-kfy5I3O6EDYi4X",
      "https://drive.google.com/thumbnail?id=1h2LskyydTZgWZOt9ZraHT1AsXTgAPExo",
      "https://drive.google.com/thumbnail?id=1bFrE1D6W8U4Wp0Oh__1IzUaKM4mqqrtr",
      "https://drive.google.com/thumbnail?id=1du9Uh7EVosutiHcgbOfshYiwCBpR4lSC",
      "https://drive.google.com/thumbnail?id=1W5GHubtkrNMWdg2eaGw47Wv8DANAVCyn",
      "https://drive.google.com/thumbnail?id=1EYuJjxRjxHxi_zifOL3pNLzj-AH-7cjv",
      "https://drive.google.com/thumbnail?id=1quClwPrHbz6i-qbLlsLBCMDIHDc0Jlj5",
      "https://drive.google.com/thumbnail?id=1QXEx3gSIE7jMqHYsTcTvyPY62eFE6GXM",
      "https://drive.google.com/thumbnail?id=1oD8n2_dQwfnb3YNXe8hxo5HuaMSsW2r3",
      "https://drive.google.com/thumbnail?id=1sH0KEeUwYTVgvNC9zedg770iXBRMlYF1",
      "https://drive.google.com/thumbnail?id=1XNOBKlZOEEIi9opRsgo8e013ESuhF3tW",
      "https://drive.google.com/thumbnail?id=1aKkuHBhqI-tuuBaoU9EpzbWc3sBvZKCn",
      "https://drive.google.com/thumbnail?id=1gUZA19NzeAAObWLmf8-T93U9bttBvMoc",
      "https://drive.google.com/thumbnail?id=1FE7yBTbqAu8_HfQwF_2CpfW5fEADHXGq",
      "https://drive.google.com/thumbnail?id=1ZmzOfDtAcb6oZrnSO3EBu5qJ578EGp99",
      "https://drive.google.com/thumbnail?id=18N711oXmCvcMYIrAM8XmOw4O26zzNBOG",
      "https://drive.google.com/thumbnail?id=1vXMtyRWXSlS1QvnkFSZ3Uks98TaA97v1",
      "https://drive.google.com/thumbnail?id=1vmS74vWfG-2jgdsLr-UpQ-pUuTN4IWHh",
      "https://drive.google.com/thumbnail?id=17IIA34QXf91Q24cq0Wev_X2hqy47psSc",
      "https://drive.google.com/thumbnail?id=1JKUYhpJOIMvz0UpbNvN2txBb0YmE62Y-",
      "https://drive.google.com/thumbnail?id=1fAREcE0whmVRNThw499I7i2pZ75n2Vfi",
      "https://drive.google.com/thumbnail?id=1cDG9-3vmfhludGddOXruSHKGdyO4IoZf",
      "https://drive.google.com/thumbnail?id=1NJT8kc-wp1f1HdEM9wL88t-BV19mw0Bq",
      "https://drive.google.com/thumbnail?id=1VdJkB1sYxF2b790M2NVhnn8_lmj4lIQI",
      "https://drive.google.com/thumbnail?id=1HwfG48xOd9d_sjGoWEtNvupV4L8CNFC-",
      "https://drive.google.com/thumbnail?id=1GOCfH5FICaYUekmbM0Sd7AWj6Xc5edNc",
      "https://drive.google.com/thumbnail?id=19qxbHOqJX-7a51cNT2W7pWRHcb22pDUj",
      "https://drive.google.com/thumbnail?id=1ndSMfSwrpj6kGQff08A-EgWK2kJpNxnD",
      "https://drive.google.com/thumbnail?id=1NsQgF6O1b4M6xSBiKbf1QUIloRVCGH1g",
      "https://drive.google.com/thumbnail?id=1k4QvWgSb02Ztv9yhJcNAR-dofff4jkLI",
      "https://drive.google.com/thumbnail?id=1Lii4lcq4ZGWMVFMgjX8YWlv8aMdMMSjm",
      "https://drive.google.com/thumbnail?id=1fYKD5v6gywiMBEism9hk1R_8cV0joh1h",
      "https://drive.google.com/thumbnail?id=1SJAjs7dcbc1urawBEI5I0fMeUZhOM7BS",
      "https://drive.google.com/thumbnail?id=1_Kmlllt5wQtntr4ZU_hyi2JzxTjT9ORC",
      "https://drive.google.com/thumbnail?id=1oZ3ecnyp79PlOlKuiqVaYih3PlZjKL_j",
      "https://drive.google.com/thumbnail?id=1HyZcuy0lTjamPqWLo0pJcHX8CyXjohlo",
      "https://drive.google.com/thumbnail?id=1UVCn7YrmnDOPEV8kbZR-qdPRgG6pTYmq",
      "https://drive.google.com/thumbnail?id=1DzseE5s1OGzv3QTUOsiVQAlUQCC_RRc2",
      "https://drive.google.com/thumbnail?id=1zfb9kfztgzF-MxEN0Wf3lMSiWKVrwuZh",
      "https://drive.google.com/thumbnail?id=1gm6-wIvzyKY0v6yE-d8F4up5BNZ1uDFT",
      "https://drive.google.com/thumbnail?id=1UIoJVH3pZ1XJTZDca3lNV4PyVXw1JLf5",
      "https://drive.google.com/thumbnail?id=11vdFF7xxJ7IYVfSuWHoc4eTctXggUvNw",
      "https://drive.google.com/thumbnail?id=1jGc8Q4OqHtHhgZEUraaeJABvpLvl4cwq",
      "https://drive.google.com/thumbnail?id=1Z_QZ5ZdFZPtPyrFqQpuxHsHFsA8X8WQd",
      "https://drive.google.com/thumbnail?id=10ZyqAqtvOnuMd4xJGM_UXQ_AJUflRHXZ",
      "https://drive.google.com/thumbnail?id=13mOOjI8071Y7PI5bvAgJ6GdByIglQ_U6",
      "https://drive.google.com/thumbnail?id=1gYdod1GWxZjehHpCxe73SZms55ixyQ9C",
      "https://drive.google.com/thumbnail?id=1XL5AMH0lvenpHhw4Yi4wo0reMuCjQSOz",
      "https://drive.google.com/thumbnail?id=1eaplBn_laeVPDNbkdu8PVVFXwIrRfWK4",
      "https://drive.google.com/thumbnail?id=1Oj38S9QU_H2DymvuFX8kVGxRMMRjMLep",
      "https://drive.google.com/thumbnail?id=1b2zdN2nSiy5bjA7FLkROB4uBsF_VVyaI",
      "https://drive.google.com/thumbnail?id=1pptVTZM-JGi9_lbCL76fuN2nHtTlY7RR",
      "https://drive.google.com/thumbnail?id=1RrGMFW-SHszmfD3FIBHTpN5X-muE4xfH",
      "https://drive.google.com/thumbnail?id=1UM76Ijc8lnHczAbqVUJk3F-DbviCVbBL",
      "https://drive.google.com/thumbnail?id=1IE0yr4TPHnbUOnPn0ED6JoQVzQZwXwgI",
      "https://drive.google.com/thumbnail?id=1YWoG1PpK4M8NWg3yuiFhbDt6kqJqkKTt",
      "https://drive.google.com/thumbnail?id=1wScojyAnd0JGQFpZeYWvym2o3OL1EsgE",
      "https://drive.google.com/thumbnail?id=1x8ekc_pQMzxAzTEL503N9764k11J_LtL",
      "https://drive.google.com/thumbnail?id=1VqR7dYi9qwbTlf1I08Lb24COOUZlgNsu",
      "https://drive.google.com/thumbnail?id=1h8kYQQjb9HEb_ouJW2mYMScRosGw4eDP",
      "https://drive.google.com/thumbnail?id=1cACJSWh9SAAHbYb8s_EgeXkm0Lf_GwcW",
      "https://drive.google.com/thumbnail?id=1nAdtKOsgcmMmDjcYTc3Tg6vQQyRk7_A7",
      "https://drive.google.com/thumbnail?id=1cvb4oavVk6XUdE7sbkQwLhBlhkP8Kgck",
      "https://drive.google.com/thumbnail?id=1u8SEIEJmjATYndH2fa9po3ugfjoUxmEG",
      "https://drive.google.com/thumbnail?id=1ShnB6zbYlkg3X-2G8iS2oQTDyGJtAyxl",
      "https://drive.google.com/thumbnail?id=1DvXiOHHaezpuKk-qfh7rF-vXU9CC-CSw",
      "https://drive.google.com/thumbnail?id=1zKiL3DtL4O1BM2L0CNJxa1gk9gLZU1q-",
      "https://drive.google.com/thumbnail?id=1kFGmNZ3OBZIxSlGVyYEG9I_Ih3Gqdcn5",
      "https://drive.google.com/thumbnail?id=1ut19rVLl73l-ig3FIvW_5QMwyxLESodR",
      "https://drive.google.com/thumbnail?id=1yO0bdg9HD0Hd-OFzwl6-QwHyFJoxX8VO",
      "https://drive.google.com/thumbnail?id=1tp_xQ8-xEgKLv-WqAZmLwRmGEC-rMRQk",
      "https://drive.google.com/thumbnail?id=1k6dlLOvxaEM_GsuNOZryYECborAVBBsE",
      "https://drive.google.com/thumbnail?id=19b_8KRAHR0nswGVXxU760RY_qndAIZQ_",
      "https://drive.google.com/thumbnail?id=1WXwaFmSnbDDlNfagFHX3b0E8nZRaCEoG",
      "https://drive.google.com/thumbnail?id=1YJ_fSUM4Wn4to_A3edNPyZfQm_vghOtE",
      "https://drive.google.com/thumbnail?id=1qlhgM7z64IOU8BRBxD58V9_xtulmyLT6",
      "https://drive.google.com/thumbnail?id=16FDR0J4fTwld9CyCMgIPD89_5C9ggiZu",
      "https://drive.google.com/thumbnail?id=1OgtZVLulEDmCcQ5YLkpy2_TtAf14D7_L",
      "https://drive.google.com/thumbnail?id=1JPEestWYhrLB2kjTBWZuUi2KLRyqI_UU",
      "https://drive.google.com/thumbnail?id=1-0oWN3eDhZmc2Wl7rjZaUC9dHmPGpUg2",
      "https://drive.google.com/thumbnail?id=1LUr-0VNUTozcfAXp2GteoWuiRs3FMkLs",
      "https://drive.google.com/thumbnail?id=1qZmkHwzIypLHHJ_hIOhwdUNhyhGQQngb",
      "https://drive.google.com/thumbnail?id=1EL6nqdS6xhwVPDB-5lk5pALgRakmGyHC",
      "https://drive.google.com/thumbnail?id=1bg0-gGXs8TPM5Lj9vc4KbdbemMO8Vui2",
      "https://drive.google.com/thumbnail?id=1nGNdhodOYWqitvrNzynLCO1vDyQvVS2X",
      "https://drive.google.com/thumbnail?id=1zng0LBTwrEdyeMBpxpwT6enqJ08mR-UI",
      "https://drive.google.com/thumbnail?id=16HEuk6F4Z-WCCK2pVSrIi4Le4FwH7s5p",
      "https://drive.google.com/thumbnail?id=1O2guNG-DV0h7X0HBB4mX8Zzl_QGUT4hz",
      "https://drive.google.com/thumbnail?id=1Xk68muBUWSKoV_es9nmIFjp8DdNghF9H",
      "https://drive.google.com/thumbnail?id=1NSpcR6wYNtdrko3p4CuoH__fDyYZXcV8",
      "https://drive.google.com/thumbnail?id=1144zWCkaGrll7NBTdq5-DZg_fc7D_cRu",
      "https://drive.google.com/thumbnail?id=1dGkQqmoYKH2Qworr7LIxgyefw5JGClsI",
      "https://drive.google.com/thumbnail?id=1mwEV3zPzg_bRnejUn6bVfVzBQ_Mix4ry",
      "https://drive.google.com/thumbnail?id=1OMtN-GAuaPWlcwMndjuJXsTezYkSo8LM",
      "https://drive.google.com/thumbnail?id=18At83KWy1hgYB7cy1ThelRzN9-cYNDFN",
      "https://drive.google.com/thumbnail?id=1lihmFYbHqzR3w_3rf2GJ3499kajeRxEm",
      "https://drive.google.com/thumbnail?id=1fYez0tL_KrC86lezm0iEMWhXt0YYgwIi",
      "https://drive.google.com/thumbnail?id=1LC14HUKGlT0ej3pNFkPYKfyHkHBz2LqD",
      "https://drive.google.com/thumbnail?id=1Z7riPDNeFt63iQhIps6_DvtUlSv4qjJ6",
      "https://drive.google.com/thumbnail?id=1NVU_G4mpP4rfAiCU-j8vXNo4Gx4pnzBA",
      "https://drive.google.com/thumbnail?id=1IWnbsbFW096TJxtlKCAdi8DxjcimZMjk",
      "https://drive.google.com/thumbnail?id=1GB7W_NAKmASVlnvoi1IrfJoYlc2iM8gz",
      "https://drive.google.com/thumbnail?id=1jaFYAmeCzZ9ZERsB6PJfN5Z0r_1fyZ2k",
      "https://drive.google.com/thumbnail?id=1h3Bl2S-RbpEnK5xWtn9gI18ES4E29ILV",
      "https://drive.google.com/thumbnail?id=1ozj6phtcb7quucr7rLMgMcqXjvMfgRJ0",
      "https://drive.google.com/thumbnail?id=1NL2J32GhX7Ge0OW_f1thLN0Xf3XkpjAI",
      "https://drive.google.com/thumbnail?id=1kLZBp3n9e-BfHQgcAYkADoXJbM8bR-8J",
      "https://drive.google.com/thumbnail?id=1QcVbmRpFw9M3hwv3YlnYBEPkvzzF124u",
      "https://drive.google.com/thumbnail?id=1aYLzLEZAJGS1oD_JWNVTabm3cOQlQUjs",
      "https://drive.google.com/thumbnail?id=1p1PO79M3Gixwfm21L1TwcE__-LIy7T2q",
      "https://drive.google.com/thumbnail?id=1Jp3ooCaCPM7ETOGiD8zS4ISANmssWjmv",
      "https://drive.google.com/thumbnail?id=1Y1exbOpe-zJPu71RdffYDD3wOGVUc0uW",
      "https://drive.google.com/thumbnail?id=1nW4Rgg0k4v3Sfr5VIWm7zKFKzHfkZ9Ot",
      "https://drive.google.com/thumbnail?id=1G00UJKgSkHczhXIqfjYm8CTj0DhnlUAh",
      "https://drive.google.com/thumbnail?id=1qYij6aVRHdSOMkrZHqPUqVj5dFGqiSLX",
      "https://drive.google.com/thumbnail?id=1Tk73BoxtzdfXpE1z-pxSTLEMJh27eVxG",
      "https://drive.google.com/thumbnail?id=118L_VLrijglRw-Pm0vfivG_Kd5TH7Lee",
      "https://drive.google.com/thumbnail?id=1hc_QR5X-9ckJ4WN4-NBbEIbO1nh9g6ga",
      "https://drive.google.com/thumbnail?id=1QhrlUaIFZfp8zdVlOtYPMIitZ6SYJzx5",
      "https://drive.google.com/thumbnail?id=1jCzx1aRh327Pedn_M8UhV3waYXHUyP8q",
      "https://drive.google.com/thumbnail?id=12rnEUfTDK768X997KNfw0aNSJwgXiAR5",
      "https://drive.google.com/thumbnail?id=1_CXhNrtrWlTs8AvGAH2S0qtjnxhJyCXQ",
      "https://drive.google.com/thumbnail?id=1iWPQhC1-CCMzwKR_iKhfwF7rTxQCAUw-",
      "https://drive.google.com/thumbnail?id=16UNpsZNbWbNBGT6S9AJL0WMTfXDzLSiX",
      "https://drive.google.com/thumbnail?id=1m-caXJD0ZBYA5RxuDQeOwPd0apRsKWcw",
      "https://drive.google.com/thumbnail?id=16FWeaia1FtqSUzt2xv5MRVAvK3jOVEVo",
      "https://drive.google.com/thumbnail?id=1h2baj0Xmu5hLqK1jomolydjPhZ2Tn8kj",
      "https://drive.google.com/thumbnail?id=1TlEvi4YFFfbhJBZLP0mrHljmvObUX_q5",
      "https://drive.google.com/thumbnail?id=1Pokuyte2DEnvcVkJsDJxUrYsKHRLyJML",
      "https://drive.google.com/thumbnail?id=1zv6YoDFy0MVjLTIRfsYUK1TzJO3-Bdss",
      "https://drive.google.com/thumbnail?id=13vGXRPriGEXXX5G0YfU4KcfcOSc011ax",
      "https://drive.google.com/thumbnail?id=16eKbZEie0BGyYbLkVwbHfanszp6lj1GO",
      "https://drive.google.com/thumbnail?id=1xb1-FO_7-RJK86mf_aBou-74gfw1DlUt",
      "https://drive.google.com/thumbnail?id=1ksbCmxi4sGh_6IL18tjeqh1o2JavBQjN",
      "https://drive.google.com/thumbnail?id=12YwVmdFbcoq77Dm2-ay-cw6aEHPYjbx5",
      "https://drive.google.com/thumbnail?id=1IR3UmWQ_2t4oMsyVA0Vh26OxE5I3Pecf",
      "https://drive.google.com/thumbnail?id=1RGiDg2YalKRFq5H4urAwMB7Td1saHHRn",
      "https://drive.google.com/thumbnail?id=1q3ZZBvSKlZYMbathxLZNU48lX-OhyTPB",
      "https://drive.google.com/thumbnail?id=1yd64-VOgJvFYolNVjB-80LJDKmtgksyQ",
      "https://drive.google.com/thumbnail?id=16SV3ibVMrGh8xCFt083b0q3i0D89oqiu",
      "https://drive.google.com/thumbnail?id=1XDqj9poyQ_-TyAseMsvr7RznUO-3s_bW",
      "https://drive.google.com/thumbnail?id=1aBSsQSQ3_gSUUEHQVHL-Yk2lSN1DBoYh",
      "https://drive.google.com/thumbnail?id=1-qyj8X2U_gV8ZOr29Poq1Ic1fLiXaqYW",
      "https://drive.google.com/thumbnail?id=1kpGc6iupjQrZXsbLMDwcWb8EyaJFMdGD",
      "https://drive.google.com/thumbnail?id=1g5dJ16qgXLH4IEnVNqF1C-jXfeOAmZku",
      "https://drive.google.com/thumbnail?id=1GMxHQaBEf7CRX8L0OtAY4UWkCrJ3f4x-",
      "https://drive.google.com/thumbnail?id=1UmaDdPpEl8d9JyFdi65L9Enz0Ms45Tlj",
      "https://drive.google.com/thumbnail?id=1E2KrxCCFgJGk7uGLWS-pjKgrVhnIesFI",
      "https://drive.google.com/thumbnail?id=1MGdqTtuhxQNn9H3HJjQGrf2WFXt2p_2w",
      "https://drive.google.com/thumbnail?id=1rJNRz4k9-8WXFt8KszqNWG0JoHd-pP2Z",
      "https://drive.google.com/thumbnail?id=1OsyzGvPbBUpWy62t6MBDd-hYeI_voP6S",
      "https://drive.google.com/thumbnail?id=1lzWrApfsI7ao2SClumaYzEKiBT3KqbsB",
      "https://drive.google.com/thumbnail?id=1BSfg-EazgCLA0r2K0Hn4ow9pQY5W7QLs",
      "https://drive.google.com/thumbnail?id=1LUkCBy4MJARf8ZzkSQUQIrfMj-Gf4cvz",
      "https://drive.google.com/thumbnail?id=17F0Oefp6xlQY0lt4KvIUiKnf6JBVnPHl",
      "https://drive.google.com/thumbnail?id=1fFsgIGJtUSda86qO9doIQGBKCFFUuNX2",
      "https://drive.google.com/thumbnail?id=15Fnus7VLmkTu14okbF1nY9LWAfNAnwg8",
      "https://drive.google.com/thumbnail?id=1p7jq58oLtsaFO2flgvpoToCHtCrZTaFl",
      "https://drive.google.com/thumbnail?id=1GpJBk_440E8Qm5OpQ9kVt1W1AzMmFnmm",
      "https://drive.google.com/thumbnail?id=1i-vBoKTZAHJvP28Uy2b-axI_TEzN5mmY",
      "https://drive.google.com/thumbnail?id=1EmX_NF4EggwQN4XZ5gVIyDjJysyD8VU1",
      "https://drive.google.com/thumbnail?id=1Axtgpza9zq52BNSMXQErqHwCYKTVWWe2",
      "https://drive.google.com/thumbnail?id=1PQ195HU9ppkmjJDgnrF1X1E5CV1sQ-AQ",
      "https://drive.google.com/thumbnail?id=1E3UZ4pa6kaAHAFq5f2TX6kUGm4uLP0Vb",
      "https://drive.google.com/thumbnail?id=1cDSMVdR57jPvA278ZK7slBihnvC5fnZh",
      "https://drive.google.com/thumbnail?id=1m6768Ja9SEcm_jeleQRbIyaZ1MiKoSV5",
      "https://drive.google.com/thumbnail?id=1hUasQEUnpIN0Kh-k-qcc6ltkc8WSEyyf",
      "https://drive.google.com/thumbnail?id=1DAtnt7ku7fwwu1mtQGXG5TcmjlodW7ti",
      "https://drive.google.com/thumbnail?id=15cc6_Ye18YtLSB6gSFfVz72IumgFuMr-",
      "https://drive.google.com/thumbnail?id=1OXKJ_l_RycGiB7ATAmYP7uOhkMs3iJ50",
      "https://drive.google.com/thumbnail?id=1cxZCPWOrF_SqUsWO46NG-b9Gjx4uJKWf",
      "https://drive.google.com/thumbnail?id=1GiEzSa5w9CGp9Lw3dbWF5KQeSlmmXk3j",
      "https://drive.google.com/thumbnail?id=136ROTFYyBXnKeMMtrAEdBy61w3L1_RbY",
      "https://drive.google.com/thumbnail?id=1Xq3zKMB3WM8zTadm07Cpb4nYJMKhuaMw",
      "https://drive.google.com/thumbnail?id=1X63Se5Qp2rlm4qGm01E4T3kWijJsMx85",
      "https://drive.google.com/thumbnail?id=15nnecCRAt2BvZuVq81WfvG8CA3McKCAw",
      "https://drive.google.com/thumbnail?id=14w0OlxWiQfYeBUKVIQI2VkDj-4eDQtEX",
      "https://drive.google.com/thumbnail?id=1V1Nk5FygGCNloyQf0WFaj4rtEkGfnowc",
      "https://drive.google.com/thumbnail?id=1jASP26GgaK---dGQbWuGKjOREzWus5dR",
      "https://drive.google.com/thumbnail?id=1sUghwIHwS3DOeYeTGkp5vcH7OdwfLXau",
      "https://drive.google.com/thumbnail?id=1n-Gy0GHVn8j4PUxFgDugrSuRMy4m46pJ",
      "https://drive.google.com/thumbnail?id=1Q8LUfMsYmtDrLnNEg9J3uPc_rSEr9NE6",
      "https://drive.google.com/thumbnail?id=1l-n6AEMNfv0x8gRCnKzXSpm5vApnSbBS",
      "https://drive.google.com/thumbnail?id=1DGYVCyw15XhQFmG_kayllWY1r3k2r59b",
      "https://drive.google.com/thumbnail?id=1R-Q74O-RLJiODJB2d8AX1F4a4qgsteBq",
      "https://drive.google.com/thumbnail?id=1WSuaPr3nwQ_LhXHeiJ0TSA0RU7y41Yqc",
      "https://drive.google.com/thumbnail?id=1MOvvrB_cDsHWtiRai1DrE1--BhCNTB3V",
      "https://drive.google.com/thumbnail?id=1hVhyuTzHZwkADwhJpPqBIXj-vcqdVygQ",
      "https://drive.google.com/thumbnail?id=1wZPlmxkG1CMLpq0EFS2SnEeMnKqQS1a9",
      "https://drive.google.com/thumbnail?id=1IdpGOhkC-6zOiodkV7TUYxCRw4jdUkI8",
      "https://drive.google.com/thumbnail?id=1wLUGgPy2wS3lsCrTabxkV1TlW_Kic05-",
      "https://drive.google.com/thumbnail?id=1WNQVrzZGu5J6S-6U1y6JpjDc3etXCggv",
      "https://drive.google.com/thumbnail?id=13xhOzrh-QBIEVQJuwHjDvFE2xBPFHXTS",
      "https://drive.google.com/thumbnail?id=1HCQvRWqXgw8y1PN6yA1pvEOI7TRTV13s",
      "https://drive.google.com/thumbnail?id=18ajKSgmGHb8J_9ojqzHy6wOJPLR8OEaL",
      "https://drive.google.com/thumbnail?id=1IeOlgSRLEpw2ByqzOXHd5Azgfcgsz6V-",
      "https://drive.google.com/thumbnail?id=1FlOP01KYzs5Ay6GXrSIoGCm149ldR13e",
      "https://drive.google.com/thumbnail?id=1krbSUlE3iQCmRmF7bXDksd4TJ3Ae33Cq",
      "https://drive.google.com/thumbnail?id=1jycDUKpwSUdtdsbBp2jlhPCesWLwcFmf",
      "https://drive.google.com/thumbnail?id=1coVymR8-jJVGXXOM_zn4UIAujx9Pk6f-",
      "https://drive.google.com/thumbnail?id=1RZYXTYh2mw1vhB5FK_yXdIwW3Q1hroF6",
      "https://drive.google.com/thumbnail?id=1m0JfW3h09ujp60vXrngap8bo6Ab3sDTG",
      "https://drive.google.com/thumbnail?id=1EllFpGkp0FCuvpL-JfvxQ5HJ2VP69iRk",
      "https://drive.google.com/thumbnail?id=1vzv-KCq1zdQ2vmt1kLd55fK7bYT7T6l_",
      "https://drive.google.com/thumbnail?id=1BOunrYSXjkVzZVra0jwdOafwUfBGU2Hb",
      "https://drive.google.com/thumbnail?id=11zFIStwIFO2gIbp084gPCOYb1woib0t_",
      "https://drive.google.com/thumbnail?id=1iWFYUsm5ihS2mWls9JzdwdHGWjqNt7Qp",
      "https://drive.google.com/thumbnail?id=14tHIIws0rjKeE1Pge7vTPjn2gfk42NET",
      "https://drive.google.com/thumbnail?id=1Lyb52yjE6Da-9o1wa63L5F9ruWeirfp5",
      "https://drive.google.com/thumbnail?id=1kutSB6ti2yHRymm6oF7gQg2-UqrM0kov",
      "https://drive.google.com/thumbnail?id=1Ea61PfOv7eFkpb69J3F665D-dwgiV6s1",
      "https://drive.google.com/thumbnail?id=1NgV4fXW6p9bYG9Mfqcm3Bfb_vYPHNvj8",
      "https://drive.google.com/thumbnail?id=13rnjJjWigMNvi-8uJLs2QE9QDT8-Ovft",
      "https://drive.google.com/thumbnail?id=1PRFMC4ovYQPUUfLa8D-Vn6cGvD8xLI6q",
      "https://drive.google.com/thumbnail?id=1f9YYqMB9Cns5qOiV35G4ZFmOhbXxfOPY",
      "https://drive.google.com/thumbnail?id=1GKWwYtDnlO1HPTrHFa2ESxVkleKjWhu2",
      "https://drive.google.com/thumbnail?id=1O-Gxsx8xU0w5Dp7KBr6-V6NyZ1xCSc1D",
      "https://drive.google.com/thumbnail?id=18N2wKTP2umfgLZiQq9Zzrdi-wLSMJlrX",
      "https://drive.google.com/thumbnail?id=1SkD4kls4yRH9e-SYCg8oQdeexYx4vI5c",
      "https://drive.google.com/thumbnail?id=1jMK7ifY2cUcMRzxCbudKk8IzTivgyLF7",
      "https://drive.google.com/thumbnail?id=1l7MKQ4k0CZTXLD1J9pL-4EOi2IVkkJRJ",
      "https://drive.google.com/thumbnail?id=1E0ZSGjPVfJPzSSb4jqHjGs6Q9ht5UcDi",
      "https://drive.google.com/thumbnail?id=1iu2N9V5iDx60nc044s-DDJTpqxVbdtuf",
      "https://drive.google.com/thumbnail?id=1jUFy5umwYw8aGOABh8l8rOwGiqkHOOCj",
      "https://drive.google.com/thumbnail?id=1DJKPycctrzfMcedO6p3FiHkDZmE7blhj",
      "https://drive.google.com/thumbnail?id=1FJ5lOrryMnK77NyWBkOlgWUf0Rp2c0wF",
      "https://drive.google.com/thumbnail?id=1gf3Y2K-haXMqtNsT2YxfK7FrFJjbDDcj",
      "https://drive.google.com/thumbnail?id=1k_rDYb_dgr3Q09lC0yaUps6eGOf-pEAg",
      "https://drive.google.com/thumbnail?id=1GAljlrO1PxC5MXLJ_Xl_cP4FoKncqi4X",
      "https://drive.google.com/thumbnail?id=1h0ss5t8xovXtDa-cFK-fgKjbKWqnD3iM",
      "https://drive.google.com/thumbnail?id=1Jiy3KpxExO-GuAPt3m33UWZuNEEm-sZr",
      "https://drive.google.com/thumbnail?id=1Oc1M4Q2x2oIOtL0w91cYx8r1dFbbL2pO",
      "https://drive.google.com/thumbnail?id=14wSBCZKeq3SHLO8vwyeAzWBTEvc3BNj6",
      "https://drive.google.com/thumbnail?id=1uZePO6qy644N7AdtUyEVc9Gk5vghKPzQ",
      "https://drive.google.com/thumbnail?id=106GZUlEk3j3MguhC_j8hZVBLeRbbgc-N",
      "https://drive.google.com/thumbnail?id=10wu_lnCnTkf_e6i29R2Alv1ULRiZa3wx",
      "https://drive.google.com/thumbnail?id=1L7TDasO4E_i4SzTe8_8ES2wV3tMjm9mn",
      "https://drive.google.com/thumbnail?id=1O7Omx4wzMFqSI6qoHlgtOeXUb0pMTxE1",
      "https://drive.google.com/thumbnail?id=1ybUbmaVw7kCVYq-diOikKL5sQ9aQlyCG",
      "https://drive.google.com/thumbnail?id=1jJXozr44rAhLzy6VTnh7xQWFtMC6T-tS",
      "https://drive.google.com/thumbnail?id=1TcUrrQ7N_fC8qg6gx7HXANM_gIDFb6w9",
      "https://drive.google.com/thumbnail?id=1uhxX4lZWMMaU8hsT2mb2xuFzDsKSglEQ",
      "https://drive.google.com/thumbnail?id=1quRT7-7a-boyU3YuxbD_IHNvwKsaYwuT",
      "https://drive.google.com/thumbnail?id=1LVSAtNuAGUh1DRD8hdDGb3r634T2AuTy",
      "https://drive.google.com/thumbnail?id=1ucXZhM1a4IX3s8R5a_nPdNDomWYGjjrq",
      "https://drive.google.com/thumbnail?id=1FSNeCY5ZAu6pKRJ705UQTuYRZ7yzTChj",
      "https://drive.google.com/thumbnail?id=1umBL3zOyJ6t0BQgu_dB4usdxehMtp_Aq",
      "https://drive.google.com/thumbnail?id=18p1HREDv1SelsI28PYjyn4hxBlogyw6F",
      "https://drive.google.com/thumbnail?id=1t0T8g0tmgBtv3WqMHONVmO3pkdKqmHr3",
      "https://drive.google.com/thumbnail?id=1jy4rrbsPTjOrsuiLWrJT9arOohETsDj1",
      "https://drive.google.com/thumbnail?id=1zstZhbZO7cKZliZN8vmCKYPr7FkrGXCj",
      "https://drive.google.com/thumbnail?id=1g0kb2_CcrszPI9kaFWXOHqTfxcx_Tuge",
      "https://drive.google.com/thumbnail?id=1qcofmYSfNhBEizb4aFx-bq32CL_V27YA",
      "https://drive.google.com/thumbnail?id=1m3VUOmE3GdNHy22Lz8nKfOaOrc30ESOM",
      "https://drive.google.com/thumbnail?id=1rgyiqHcy7B2cdh2NXNDqyND1IZeYyYDr",
      "https://drive.google.com/thumbnail?id=1d9h8bW3X5mIh1M9xDCBVfGhSD3Ae20yD",
      "https://drive.google.com/thumbnail?id=1Sp1YOZvpAVOeTOUyYdYX-Icjy5gkHjwB",
      "https://drive.google.com/thumbnail?id=1MO5GG6d5Qq9X6NZTGThsKR9sXvRJMUnQ",
      "https://drive.google.com/thumbnail?id=10rz0wmAqXxTUKEvOrNhICUTet_Jix5mO",
      "https://drive.google.com/thumbnail?id=1nr4IGAL8ArefvZ4BKDHO73Hz4kOLI7OS",
      "https://drive.google.com/thumbnail?id=1om5f7UNLEELMH-S3FIZ6gQw_m30UEmk5",
      "https://drive.google.com/thumbnail?id=19Q8C6uycF2pcDpxxSiByRVTXSQ2U3ZIn",
      "https://drive.google.com/thumbnail?id=1XCwwOIf3rnc9mMuK3CHxXmrGsrxLtPba",
      "https://drive.google.com/thumbnail?id=1gi1fvP8J0tSeF1PK20rspS7fBIFWR5Qn",
      "https://drive.google.com/thumbnail?id=1_Px0tcT_PaP2aNJIAw01a7D4RKNfKflA",
      "https://drive.google.com/thumbnail?id=1PT-jXldk5VE-MQgZuraFx-3aKbctYZTc",
      "https://drive.google.com/thumbnail?id=1hB5ZdNKPaf9KwsR1OPZ9J2UGZ37iioCq",
      "https://drive.google.com/thumbnail?id=151uqixnGHMj5gmHPkv-ReOKeV31mmJJc",
      "https://drive.google.com/thumbnail?id=1hV-1TUbhbMdQSE67GL81TiqBdnIjVp75",
      "https://drive.google.com/thumbnail?id=1XG6_OCf9cEYmfJD-QanVW1CW8w8YUuvw",
      "https://drive.google.com/thumbnail?id=1WkAUuUgfd2_j0IZggbM-R0lb54nvv5MB",
      "https://drive.google.com/thumbnail?id=15aZZkEkBRXWELAnCuJ5l6v4bXLcaUSG_",
      "https://drive.google.com/thumbnail?id=1OPHKM8XAwzwhQdTe3Ub6SO01MYGDeCeN",
      "https://drive.google.com/thumbnail?id=14BTusMlW9g_3wXOMpyamq5-ikSbyMoLo",
      "https://drive.google.com/thumbnail?id=1IKT9VRQ89ra6bzTeVK5ADmBMEnW0x1Nz",
      "https://drive.google.com/thumbnail?id=1BidqMS_PsmXurobIPXR37zaplgbTpKCn",
      "https://drive.google.com/thumbnail?id=1TunuiejZrTxUlt4VR85by0seFUbW6726",
      "https://drive.google.com/thumbnail?id=1jOA8yhrrIN-wJlAn71URvRjNSaYZnrrp",
      "https://drive.google.com/thumbnail?id=1DJEnq86WEGfvuiS9JA1-cuAMUT0jMMU7",
      "https://drive.google.com/thumbnail?id=1yBXEEpZy8quOv-9xKmm9qTn4L_dsla8D",
      "https://drive.google.com/thumbnail?id=10A00nqagQByiuoBIGNorpTokc139mB1u",
      "https://drive.google.com/thumbnail?id=1jolOib5e5TYbOKkpIHQ4Nc3r5Xc9OXo1",
      "https://drive.google.com/thumbnail?id=1w-ABLdAwzH0kvpPySafusbMbEtTqiRH4",
      "https://drive.google.com/thumbnail?id=1_pnR7cbGHHSlvNttPrwvQlu_Zp-YB7AU",
      "https://drive.google.com/thumbnail?id=1gcMIqcNVhlH-pJQJN3exq0BpQuG6PTBg",
      "https://drive.google.com/thumbnail?id=1415XkxQwAjjwGYkbVFMhRFo7MwtBtgLP",
      "https://drive.google.com/thumbnail?id=1zsvMbzTRHkbiCnNJGAGU9uA3DQDheDkO",
      "https://drive.google.com/thumbnail?id=1JYq9BsS1XQQ-UtyY_9wZd_UVPuCYjbXi",
      "https://drive.google.com/thumbnail?id=1ThTBLScwZxso4LKmmFkmOQA7KstRRDV-",
      "https://drive.google.com/thumbnail?id=16uPF4JaNMaKTShsq1WcrTxbGSCLftKer",
      "https://drive.google.com/thumbnail?id=1qaWXW_urCHleeyD4v_J1IKCzDJp8qge3",
      "https://drive.google.com/thumbnail?id=1FAVAFGA1wNJZ2-wA4x1EhwYgVlO9mjgD",
      "https://drive.google.com/thumbnail?id=1bwwsYkQ4X3rkQ87bylQij--23yso5_i0",
      "https://drive.google.com/thumbnail?id=1g4MiTmvcCrea5q8K39hzGj7pKwJQH4rQ",
      "https://drive.google.com/thumbnail?id=1fHwGLQCD0ZzdrCKgd4pnK_PIu7ipSLEg",
      "https://drive.google.com/thumbnail?id=1F4aRFzEgHPwt8j1mJI_zKq42Y5xaoAgd",
      "https://drive.google.com/thumbnail?id=1zv1ne2E0sH-EyYgNBGl3EPGe_HQh1jVa",
      "https://drive.google.com/thumbnail?id=1NTdlazVDul_BLYMiVMUC1mFVKfC-1gLs",
      "https://drive.google.com/thumbnail?id=12v7TiU3zwVHQfMeDb4opKaJvY40GBjha",
      "https://drive.google.com/thumbnail?id=176wFxgDORvFbKLu8qd9EkyIszUepK0IK",
      "https://drive.google.com/thumbnail?id=1EIWLBcPYTweIejkqMhkV6eSxlCkBzqLa",
      "https://drive.google.com/thumbnail?id=1tjdYGLGABMzBNKySb0i_BFkckmlgdvTA",
      "https://drive.google.com/thumbnail?id=1f2gmjqiW0Bdsv5gQBuowzdiNA8iRe0wz",
      "https://drive.google.com/thumbnail?id=1ilJcLrwL9oPHSYfQ9PULmK-SjEnDNTUs",
      "https://drive.google.com/thumbnail?id=1AWVfrdEgqO2FKSyOE0qrJdsq-yejByun",
      "https://drive.google.com/thumbnail?id=15ynb2mVlEYP5ndJalnUZGA_zzNH1z9wR",
      "https://drive.google.com/thumbnail?id=1N1lrT7Y82WqMeUPSFHFukbpm_Or9hPO6",
      "https://drive.google.com/thumbnail?id=13rb7320PNOeu7699JyCjwzeHBOUxAY8_",
      "https://drive.google.com/thumbnail?id=1YOv3YLIb2MsrtSQsNnEUDnatxcEZNRdz",
      "https://drive.google.com/thumbnail?id=1op6SG5VHd9BV2gEZb1FFAFRepDA_xDyO",
      "https://drive.google.com/thumbnail?id=1CP3yHOYJcBnFaYzii0p346EaJhIBqfbi",
      "https://drive.google.com/thumbnail?id=1ccB915LlZexDprzJ_AkhPucwHOLoH0gr",
      "https://drive.google.com/thumbnail?id=1tbtqmJlJuCKWkkadAnl_ZyBXghpo7sRj",
      "https://drive.google.com/thumbnail?id=197tUD9rUu00BnrWzTfGdZKMkRUUac6Zq",
      "https://drive.google.com/thumbnail?id=1ckRRcgkjAKK0IQpUk-sJB7w6I3LRK0Wz",
      "https://drive.google.com/thumbnail?id=1Q9pLB7mCEATEiG6BkEqMRY_l020RCZSN",
      "https://drive.google.com/thumbnail?id=1xhT85P-H67SeaOPiv23PduwBwxhrAsG_",
      "https://drive.google.com/thumbnail?id=1xL1S7LI9KGv3cKc7raLoj_N42aXdpDXZ",
      "https://drive.google.com/thumbnail?id=1QcMJoHlgqqh6cDqfevml1F8qTibSoF5U",
      "https://drive.google.com/thumbnail?id=13MDUAsDqtaqyDXcSmcO4xQj6xxDGBHNk",
      "https://drive.google.com/thumbnail?id=1xD8fheHcGZIxErVlK3dIT2ygMCrmZodE",
      "https://drive.google.com/thumbnail?id=10j1fQx355lZ__16iAmEdKwsdeU0zvP-G",
      "https://drive.google.com/thumbnail?id=1if_JK7YVaOv-337tGJphrFn3-sOj3keE",
      "https://drive.google.com/thumbnail?id=1C0duv2GWPl4u5LPRIkWbAYjk5iDQS0Ti",
      "https://drive.google.com/thumbnail?id=1pyD10scWBNEbMkgY0RJ4awtOWAgZjdn8",
      "https://drive.google.com/thumbnail?id=1yhcu58KwPIcgzzKQpY0okteUPdSTE3yg",
      "https://drive.google.com/thumbnail?id=1mm6JD-DRS2xh8g4RU6lR1ed6VfTrgFsM",
      "https://drive.google.com/thumbnail?id=1NFaeyRaR6lYfuOGV7yJcJTAA9SmKKjPm",
      "https://drive.google.com/thumbnail?id=12JbEC2EmzT4lJcrLB3GSSx75UVt1TPdo",
      "https://drive.google.com/thumbnail?id=1eWmoOwrI1SBQjVa-M4pxXj00wk4vwRnB",
      "https://drive.google.com/thumbnail?id=16Rrstysmvdc6ahTP73dFSCtkTLs7tntb",
      "https://drive.google.com/thumbnail?id=1F1u7x9lrpTE1McG-SG6deoJIdzs3L4tb",
      "https://drive.google.com/thumbnail?id=1-YIlUrWCweWlGIyYMZijAdwtuue7lF9P",
      "https://drive.google.com/thumbnail?id=13vPs4qZOf_bpMQf0TUjvLnebPezyrP6V",
      "https://drive.google.com/thumbnail?id=1gPI1UILqma8LImfAJLwCnBdYVMVPXj6b",
      "https://drive.google.com/thumbnail?id=1SeSsn0jn9GL-QdLgDk_1yNE9hRxAIxLF",
      "https://drive.google.com/thumbnail?id=16zc806w34bSqrozJoWsH5xYjMSgWkBQu",
      "https://drive.google.com/thumbnail?id=1jk4jmR4ynq9f91w9t_9Rg-I9kEekT8zi",
      "https://drive.google.com/thumbnail?id=1a227Ovyyjk9PUB792AC2DHO7GAnFg0PK",
      "https://drive.google.com/thumbnail?id=1FFsP4dHjd7ovmFZB8l7Fpw0xDUmqvzx6",
      "https://drive.google.com/thumbnail?id=1djLbnoZiDISUAek75-KQAQpqRd3YUx5O",
      "https://drive.google.com/thumbnail?id=14SR9SA6Ksbp3nzaz4eMOOtDeZrPE4EIu",
      "https://drive.google.com/thumbnail?id=1e38p4SCU6cs5wmobsa-8t90d2nWA1Rao",
      "https://drive.google.com/thumbnail?id=1TFtGykO5uRVb5Xfg020FziIKM0rug96R",
      "https://drive.google.com/thumbnail?id=15F0qR6bmj9vnj0lS-BXcpWyFUgkYm4bP",
      "https://drive.google.com/thumbnail?id=1bKwdostdov8c3Asqt0Lw4b9KBh9QLtqP",
      "https://drive.google.com/thumbnail?id=18QXpwx6dkPoRS7CE0xmvuR8bTU_toUuH",
      "https://drive.google.com/thumbnail?id=1y05T0LxhF_fzGCt2LmlCW-6kP15vAkdx",
      "https://drive.google.com/thumbnail?id=1HiwdHBOpC3tyI0POeQqPhPFhWwkNGLFz",
      "https://drive.google.com/thumbnail?id=1ZcHK08EzWShppZ2YFbbVebxlLzfcesYB",
      "https://drive.google.com/thumbnail?id=145PbVDtp5LiGZjCuOQgSiP7KwpOFEAQY",
      "https://drive.google.com/thumbnail?id=1ei4YLXIA9CBiPlBKsvN9oAGqzckkf1Wb",
      "https://drive.google.com/thumbnail?id=1yFovl50bU7rYYjF1Ye4UcTqTDmcp6M-_",
      "https://drive.google.com/thumbnail?id=19H1qzocAafwamexwDPfCnb4op0DqTvK8"
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
    ]
  },
  "project-3": {
    title: "Inspire Youth: Leadership in Youth Work",
    photos: [
      "https://lh3.googleusercontent.com/d/1JoChES_Ss0c--aJru0msyM9j45hzql5n=w1000",
      "https://lh3.googleusercontent.com/d/1TKexiLv9WHKsv7w1agNxZZQfUS-ngUP4=w1000",
      "https://lh3.googleusercontent.com/d/1oxS-vslFCFegOhz0L3RZxMCLJWyO6iL1=w1000",
      "https://lh3.googleusercontent.com/d/1XqIRU_WOnOC4uVNk3i5Ny1aHCT6378RT=w1000",
      "https://lh3.googleusercontent.com/d/14_ksmFjeKhoDYjverHT8aJWqg_JrS73P=w1000",
      "https://lh3.googleusercontent.com/d/176flDRmsxT3JFEYV1Ow4aN9_p-r9m2XD=w1000",
      "https://lh3.googleusercontent.com/d/1-nw-CqhBg20ER0Ias503YxTTNXDKGfRO=w1000"
    ],
    videos: []
  },
  "project-4": {
    title: "A Journey to Your Future Career",
    photos: [
      "https://lh3.googleusercontent.com/d/1SGPhqZkRCczh9hLhvc8zRaR4GJV9LeTa=w1000",
      "https://lh3.googleusercontent.com/d/1KkuZYql60Jf3BgKrU1YyYxleau_X4iPn=w1000",
      "https://lh3.googleusercontent.com/d/1UZHL4ukd8aFuuttveGGDpwUVif9qq2NO=w1000",
      "https://lh3.googleusercontent.com/d/1kgW3YYZJZuIGLyz8g11kd1nuEDbcH1xR=w1000",
      "https://lh3.googleusercontent.com/d/1OVAPo3uzsqKbnkFIZSRc_zBrnFEy7c9c=w1000",
      "https://lh3.googleusercontent.com/d/13n5OAtu92FSKaaK-UIfDV3GO8w5_b1Kx=w1000",
      "https://lh3.googleusercontent.com/d/15KvUAF2QTaHi0ou1uIlQlH85v1aNh-Di=w1000"
    ],
    videos: []
  }
};

export default function ErasmusGallery() {
  const { projectId } = useParams<{ projectId: string }>();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");

  const gallery = projectId ? galleryData[projectId] : null;

  if (!gallery) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container py-32 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Galerie negăsită</h1>
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
              Galerie Foto-Video
            </h1>
            <p className="text-muted-foreground">{gallery.title}</p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("photos")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "photos" 
                  ? "bg-brand-blue text-white" 
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Fotografii ({gallery.photos.length})
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "videos" 
                  ? "bg-brand-blue text-white" 
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <Video className="w-4 h-4" />
              Video ({gallery.videos.length})
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-background">
        <div className="container">
          {activeTab === "photos" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.photos.map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="aspect-square rounded-xl overflow-hidden bg-secondary cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage(photo)}
                >
                  <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.videos.map((video, i) => (
                <motion.a
                  key={i}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="group relative aspect-video rounded-xl overflow-hidden bg-secondary"
                >
                  <img src={video.thumbnail} alt={`Video ${i + 1}`} className="w-full h-full object-cover" />
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

      <Footer />
    </main>
  );
}
