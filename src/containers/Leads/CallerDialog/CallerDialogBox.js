import React,{useState} from 'react'
import { Dialog,DialogContent} from '@material-ui/core';

export default function CallerDialogBox(props) {
   const {onGoingCall,isCalling,isCallConnect,isCallNotConnected,callConnectHandler} = props;
    return (
        <div>
            <>
            <Dialog open={onGoingCall}>
              <DialogContent>
                <p>On going call...</p>
              </DialogContent>
            </Dialog>
            </>
            <>
            <Dialog open={isCalling}>
              <DialogContent>
                <p>Call in progress...</p>
              </DialogContent>
            </Dialog>
            </>
            <>
            <Dialog open={isCallConnect} onClose={callConnectHandler}>
              <DialogContent>
                <p>Call rejected/missed call</p>
              </DialogContent>
            </Dialog>
            </>
            <>
            <Dialog open={isCallNotConnected} onClose={callConnectHandler}>
              <DialogContent>
                <p>Call not connected</p>
              </DialogContent>
            </Dialog>
            </>
        </div>
    )
}
