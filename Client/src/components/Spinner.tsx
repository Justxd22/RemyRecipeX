import "../assets/stylesheets/Veffect.css";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Spinner = () => {
    return (
        <div className="modal-overlay">
          <div className="modal-content w-[70%] md:w-[60%]">
          <DotLottieReact
         src="/lottie/m12uodkj.lottie"
         loop
         autoplay
            />
          </div>
        </div>
    );

};

export default Spinner;