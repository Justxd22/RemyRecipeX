import "../assets/stylesheets/Veffect.css";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Spinner = () => {
    return (
        <div className="modal-overlay">
          <div className="modal-content">
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