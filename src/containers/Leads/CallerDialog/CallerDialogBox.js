import React, { useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CallerDialogBox(props) {
  const { onGoingCall, isCalling, isCallConnect, isCallNotConnected, callConnectHandler, disablePopup } = props;
  return (
    <div>
      <>
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={onGoingCall} autoHideDuration={6000} onClose={disablePopup}>
          <Alert onClose={disablePopup} severity="success">
            On going call...
          </Alert>
        </Snackbar>
      </>
      <>
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isCalling} autoHideDuration={6000} onClose={disablePopup}>
          <Alert onClose={disablePopup} severity="info">
            Call in progress...
          </Alert>
        </Snackbar>
      </>
      <>
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isCallConnect} autoHideDuration={6000} onClose={callConnectHandler}>
          <Alert onClose={callConnectHandler} severity="warning">
            Call rejected/missed call
          </Alert>
        </Snackbar>
      </>
      <>
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isCallNotConnected} autoHideDuration={6000} onClose={callConnectHandler}>
          <Alert onClose={callConnectHandler} severity="warning">
            Call not connected
          </Alert>
        </Snackbar>
      </>
    </div>
  )
}
