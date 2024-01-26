import UIkit from "uikit";
import { useEffect, useRef } from "react"
import Modal from "./Modal.js"


export default function Upload(){
    let progressRef = useRef(null);
    useEffect(() => {
        var bar = progressRef.current;
        console.log(bar);
        console.log("executing")
        UIkit.upload('.js-upload', {

            url: '',
            multiple: true,

            beforeSend: function () {
                console.log('beforeSend', arguments);
            },
            beforeAll: function () {
                console.log('beforeAll', arguments);
            },
            load: function () {
                console.log('load', arguments);
            },
            error: function () {
                console.log('error', arguments);
            },
            complete: function () {
                console.log('complete', arguments);
            },

            loadStart: function (e) {
                console.log('loadStart', arguments);                
                bar.removeAttribute('hidden');
                // bar.max = e.total;
                // bar.value = e.loaded;
            },

            progress: function (e) {
                console.log('progress', e, Math.round((e.loaded/e.total)*100));

                // bar.max = e.total;
                bar.value = Math.round((e.loaded/e.total)*100);
            },

            loadEnd: function (e) {
                console.log('loadEnd', arguments);

                // bar.max = e.total;
                // bar.value = e.loaded;
            },

            completeAll: function () {
                console.log('completeAll', arguments);

                // setTimeout(function () {
                //     bar.setAttribute('hidden', 'hidden');
                // }, 1000);

                alert('Upload Completed');
            }

        });
    }, [])
    return(
        <Modal show={true} title={"Upload Books"} progressRef={progressRef}>
            <div className="js-upload uk-form-custom  uk-flex uk-flex-center uk-flex-middle">
                {/* <div className="uk-border-circle">
                    <span uk-icon="cloud-upload"></span>
                </div> */}
                <div>
                    <div className="uk-border-circle uk-flex uk-flex-center uk-align-center" style={{backgroundColor:"#f9f9f9", width:"136px", height:"136px"}}>
                        <span uk-icon="cloud-upload" style={{height: "50px", width:"50px"}}></span>
                    </div>
                    <div style={{textAlign:"center"}}>
                        <span>
                            <p className="uk-text-emphasis">Drag and drop pdf files to upload</p>
                            <p className="uk-text-meta">Your books/content will be private until you publish them.</p>
                        </span>                    
                    </div>
                    <div>
                        <input type="file"/>
                        <button className="uk-button uk-button-primary uk-align-center" type="button">Upload Pdf</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}