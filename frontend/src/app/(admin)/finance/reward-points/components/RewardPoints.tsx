"use client";
import React, { useState }from 'react';
import { Button, Card } from 'react-bootstrap';
import { Icon } from "@iconify/react/dist/iconify.js";
import RedeemedPointsModal from './RedeemedPointsModal';
import AddPointsModal from './AddPointsModal';
const RewardPoints =() =>{
    const [redeemedPoints, setRedeemedPoints] = useState(false);
    const [addPoints, setAddPoints] = useState(false);
    return (
        <>

        <Card className="p-2">
            <div className='mb-4'>
                <div className='d-flex gap-1 justify-content-end mb-2 border-bottom pb-2'>
                 <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={()=>setRedeemedPoints(true)}
                    style={{fontSize: "10px", fontWeight:"bold"}}>
                    <Icon icon="mdi:minus" className='me-1' />   Redeemed Rewards Points
                    </Button>

                      <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={()=>setAddPoints(true)}
                    style={{fontSize: "10px", fontWeight:"bold"}}>
                    <Icon icon="mdi:plus" className='me-1'/>   Add Rewards Points
                    </Button>
                </div>
        { redeemedPoints && ( 
            <RedeemedPointsModal onClose={()=>setRedeemedPoints(false)}/>
        )}

        { addPoints && (
            <AddPointsModal  onClose={()=>setAddPoints(false)}/>
        )}
                <div className='table-responsive'>
                    <table className='table table-sm table-bordered mb-0 align-middle'
                    style={{tableLayout:"fixed", width:"100%"}}>
                        <thead>
                    <tr style={{fontSize: "10px", whiteSpace:"nowrap"}}>
                         <th>S.No.</th>
    <th>Agency Name</th>
    <th>Total Points</th>
    <th>Points Consumed</th>
    <th>Balance</th>
    <th>Action</th>
    </tr>
                        </thead>
                        <tbody style={{fontSize: "12px"}}>
                            <tr>
<td colSpan={3}>No result found</td>

                                </tr>

                            </tbody>
                        </table>
                </div>
            </div>
        </Card>
        </>
    )
}
export default RewardPoints;