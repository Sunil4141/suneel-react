import React from "react";
import { RdsButton, RdsFileUploader } from "raaghu-react-elements";
import "./rds-comp-fileUploader.scss";


const RdsCompFileUploader = (props: any) => {
  return (
    <>
      <div className="row">
        <div
          className="col ms-3 me-3 mt-2 "
          style={{
            border: "dashed 2px #D6B7FF",
            padding: "20px",
            background: "#F9F7FC 0% 0% no-repeat padding-box",
            top: "121px",
            left: "1234px",
            width: "624px",
            height: "258px",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <div>
            <img
              src="./assets/File-upload.png"
              style={{ width: "fit-content" }}
            ></img>
          </div>

          <div>
            <RdsFileUploader
              colorVariant="primary"
              extensions=""
              multiple
              placeholder="" size={""} label={""} limit={10}            />
          </div>
        </div>
      </div>
      <div className="d-flex footer-buttons">
                <RdsButton
                  label="CANCEL"
                  databsdismiss="offcanvas"
                  type={"button"}
                  size="small"
                  isOutline={true}
                  colorVariant="primary"
                  class="me-2"
                ></RdsButton>
                <RdsButton
                  label="FINISH"
                  type={"button"}
                  size="small"
                  databsdismiss="offcanvas"
                  // isDisabled={""}
                  colorVariant="primary"
                  class="me-2"
                  //onClick={addDataHandler}
                ></RdsButton>
              </div>
    </>
  );
};

export default RdsCompFileUploader;