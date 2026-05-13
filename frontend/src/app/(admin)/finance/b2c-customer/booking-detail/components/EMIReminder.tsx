import React from 'react'
import {Card, CardHeader, Row, Col, CardBody,Form, Button, Table} from 'react-bootstrap';
const EMIReminder = () => {
  return (
    <>
                <Card className="mb-3">
             <CardHeader className="bg-secondary text-white d-flex justify-content-between p-2">
                    <b>EMI Reminder</b>
                    
                    </CardHeader>

                      <CardBody className="p-0">
                              <div className='table-responsive'>
                              <table className="table table-sm table-bordered align-middle">
                                <thead className="table-light" >
                                  <tr style={{fontSize:"10px", whiteSpace:"nowrap"}}>
                       
  <th>Created Date</th>
  <th>Reminder Date</th>
  <th>Amount</th>
</tr>
                               
                                </thead>
            <tbody style={{fontSize:"12px"}}>
            <tr>
  <td>Nov 26, 2025</td>
  <td>Nov 29, 2025</td>
  <td>INR 70,000</td>
</tr>
<tr>
  <td>Nov 26, 2025</td>
  <td>Nov 29, 2025</td>
  <td>INR 70,000</td>
</tr>

          </tbody>
                               </table>
                               </div>
                    </CardBody>
      </Card>
    </>
  )
}

export default EMIReminder
