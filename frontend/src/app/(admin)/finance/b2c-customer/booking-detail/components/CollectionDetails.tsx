import React from 'react'
import {Card, CardHeader, Row, Col, CardBody,Form, Button, Table} from 'react-bootstrap';
const CollectionDetails = () => {

  return (
    <>
          <Card className="mb-3">
             <CardHeader className="bg-secondary text-white d-flex justify-content-between p-2">
                    <b> Collection Details</b>
                    
                    </CardHeader>

                      <CardBody className="p-0">
                              <div className='table-responsive'>
                              <table className="table table-sm table-bordered align-middle">
                                <thead className="table-light" >
                                  <tr style={{fontSize:"10px", whiteSpace:"nowrap"}}>
                           <th>Date</th>
  <th>Amount</th>
  <th>Conversion Rate</th>
  <th>Base Currency</th>
  <th>Mode</th>
  <th>Reference</th>
  <th>Receipt No.</th>
  <th>Remarks</th>
                                  </tr>
                                </thead>
            <tbody style={{fontSize:"12px"}}>
                <tr>
  <td>Nov 26, 2025</td>
  <td>INR 201,600</td>
  <td>1</td>
  <td>INR</td>
  <td>Offline - Cash</td>
  <td>NA</td>
  <td>205348</td>
  <td>NA</td>
</tr>
<tr>
  <td>Nov 26, 2025</td>
  <td>INR 80,000</td>
  <td>1</td>
  <td>INR</td>
  <td>Offline - UPI</td>
  <td>NA</td>
  <td>205347</td>
  <td>NA</td>
</tr>

          </tbody>
                               </table>
                               </div>
                    </CardBody>
      </Card>
    </>
  )
}

export default CollectionDetails
