import Header from "@/components/Header";
import { MdArrowForwardIos } from "react-icons/md";

export default function Home({ searchParams }) {
  const token = searchParams?.token || null;
  return (
    // <div className="bg-[#1d232c] min-h-screen ">
    //   <Header />
    <div className="bg-[#1d232c] min-h-screen ">
            <Header />
      {/* Inline Script to Store Token in Local Storage */}
      {token && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              localStorage.setItem("token", ${JSON.stringify(token)});
              window.location.href = "/dashboard";
            `,
          }}
        />
      )}
      {/* Hero Section (Positioning Kept Intact) */}
      <div className="relative min-h-screen">
        {/* Background SVGs */}
        <svg
          className="absolute top-0 left-0"
          width="639"
          height="716"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M524.544 284.5c0 175.092-141.499 317.029-316.044 317.029S-107.544 459.592-107.544 284.5c0-175.092 141.5-317.03 316.044-317.03 174.545 0 316.044 141.938 316.044 317.03z"
            stroke="#fff"
            strokeOpacity="0.08"
          ></path>
        </svg>

        <svg
          className="absolute justify-start top-[-68px] right-8"
          viewBox="0 0 1440 1223"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M873.5 210.648a13.5 13.5 0 0112.133-13.431l482.997-49.151c7.96-.809 14.87 5.435 14.87 13.431v388.126c0 7.955-6.84 14.185-14.76 13.441l-483.003-45.37c-6.936-.651-12.237-6.474-12.237-13.441V210.648z"
            stroke="#fff"
            strokeOpacity="0.08"
          ></path>
        </svg>

        {/* Blur Effect */}
        <div
          style={{
            position: "absolute",
            borderRadius: "24px",
            width: "650px",
            height: "400px",
            background: "rgba(29,110,227,0.4)",
            filter: "blur(20px)",
            right: "82px",
            top: "130px",
            transform: "perspective(1500px) rotateY(-35deg)",
          }}
        />

        {/* Video */}
        <video
          autoPlay
          muted
          loop
          controls
          className="absolute top-32 right-24 w-[650px] h-[380px] z-0"
          style={{
            transform: "perspective(1500px) rotateY(-35deg)",
          }}
        >
          <source src="/meet_bryce.mp4" type="video/mp4" />
        </video>

        {/* Text & Button */}
        <div className="absolute top-[200px] left-14 leading-relaxed text-white text-4xl font-lexend z-10">
          Bring your film project to life <br /> from{" "}
          <span className="text-6xl font-[800]">idea</span> to{" "}
          <span className="text-6xl font-[800]">production</span>
          <button className="bg-[#1758B6] text-base mt-12 font-[800] px-8 py-3 flex items-center justify-between w-[230px] rounded-full">
            Start Creating
            <MdArrowForwardIos />
          </button>
        </div>
      </div>

      {/* Second Section (Now Stays Below the First Section) */}
      <div className="py-20 text-center text-white">
        <h2 className="text-[40px] font-bold">
          NolanAI is a collaborative film production suite
        </h2>
        <p className="text-2xl mt-4 w-full mx-auto">
          "Covering the full film production process from concept creation and
          screenwriting to planning and stage <br /> production"."
        </p>
      </div>

      <div className="flex px-4 py-20 text-start text-white">
        <div className="w-[60%] flex relative">
          <svg
            className="absolute"
            width="700"
            height="350"
            viewBox="0 0 700 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="20"
              y="0.5"
              width="639"
              height="362"
              rx="31.5"
              stroke="#fff"
              strokeOpacity="0.08"
            ></rect>
            <rect
              x="10"
              y="20"
              width="631"
              height="362"
              rx="43.5"
              stroke="#fff"
              strokeOpacity="0.08"
            ></rect>
          </svg>

          <video
            autoPlay
            muted
            loop
            controls
            className="absolute mt-4 ml-16 w-[540px] rounded-[20px]"
          >
            <source src="/meet_bryce.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="flex flex-col w-[40%]">
          <h2 className="text-[40px] font-bold">
            AI Video <br />
            Generator
          </h2>

          <p>
            Transform your scripts into cinematic visuals with our AI video
            generator.
            <br />
            Sign up now to be among the first to access it!
          </p>

          <button className="bg-[#1758B6] text-base mt-12 font-[800] px-8 py-3 flex items-center justify-between w-[230px] rounded-full">
            Start Creating
            <MdArrowForwardIos />
          </button>
        </div>
      </div>
    </div>
  );
}
