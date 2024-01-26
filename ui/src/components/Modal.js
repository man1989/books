import { useEffect } from 'react';
import UIkit from 'uikit';
import ProgressBar from './ProgressBar.js';

const Modal = ({ title, children, show, onClose, progressRef }) => {
  useEffect(() => {
    if (show) {
      UIkit.modal('#my-modal').show();
    } else {
      UIkit.modal('#my-modal').hide();
    }
  }, [show]);

  return (
    <div id="my-modal" className="uk-modal" uk-modal="">
      <div className="uk-modal-dialog" style={{height: "700px", width: "700px"}}>
        <div className="uk-modal-header">
          <button
            className="uk-modal-close-default"
            type="button"
            uk-close=""
            onClick={onClose}
          />
          <h3 className="uk-modal-title uk">
            {title}
          </h3>
        </div>
        <ProgressBar id="js-progressbar" className="uk-progress" value="0" max="100" ref={progressRef}></ProgressBar>
        <div className="uk-modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
