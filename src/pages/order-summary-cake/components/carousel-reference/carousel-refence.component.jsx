import Swiper from "swiper";
import { Grid } from "swiper/modules";

export function CarouselReferenceComponent({ references }) {
  return (
    <Swiper
        modules={[Grid]}
        slidesPerView={2}
        grid={{ rows: 2 }}
        spaceBetween={10}
        pagination={{ clickable: true }}
        style={{ width: '400px', height: '500px' }}
    >
        
        {references.map((ref, index) => (
            <SwiperSlide key={index}>
                <img src={ref.image} alt={ref.title} />
                <h3>{ref.title}</h3>
            </SwiperSlide>
        ))}

    </Swiper>
  );
}