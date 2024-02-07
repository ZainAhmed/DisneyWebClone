"use client";
import { viewers } from "@/lib/getViewers";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import styles from "./viewers.module.css";

function Viewers() {
  const options: EmblaOptionsType = {
    dragFree: true,
    containScroll: "trimSnaps",
  };
  const [emblaRef] = useEmblaCarousel(options);
  return (
    <div className="mx-6">
      <div ref={emblaRef}>
        <div className={styles.customContainer}>
          {viewers.map((viewer, index) => (
            <div key={index} className={styles.customWrapper}>
              <Image
                src={viewer.imgSrc}
                alt=""
                fill
                objectFit="cover"
                className="inset-0  block opacity-100 absolute z-20 top-0 transition-opacity bg-transparent"
              />
              <video
                autoPlay={true}
                loop={true}
                playsInline={true}
                className={styles.video}
              >
                <source src={viewer.videoSrc} type="video/mp4" />
              </video>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Viewers;
