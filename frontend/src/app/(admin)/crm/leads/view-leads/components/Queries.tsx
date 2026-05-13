import React from 'react'
import { Button, Card, CardHeader, Row, Col, CardBody , Form, Table} from 'react-bootstrap';
const Queries = () => {
  return (
    <>
      <Card className='p-2'>
           <div className="table-responsive">
                  <table
                    className="table table-sm table-bordered mb-0 align-middle "
                    style={{ tableLayout: "fixed", width: "100%" }}
                  >
                    <thead >
                        <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                            <th>Queries</th>
                        </tr>
                      <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }} className='bg-light'>
                      
        
                        <th style={{ width: "100px" }}>Query Date</th>
        
                        <th style={{ width: "260px" }}>Query ID</th>
        
                        <th style={{ width: "140px" }}>Travel Date</th>
        
                        <th style={{ width: "110px" }}>Type</th>
                        <th style={{ width: "110px" }}>Source</th>
                        <th style={{ width: "110px" }}>Destination</th>
                        <th style={{ width: "110px" }}>PAX</th>
                        <th style={{ width: "110px" }}>Last Update</th>
                        <th style={{ width: "110px" }}>Proposals</th>
                        <th style={{ width: "110px" }}>Stage</th>
                        <th style={{ width: "110px" }}>Owner</th>
                        <th style={{ width: "70px" }} className="text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
        
                    <tbody style={{ fontSize: "12px" }}>
                      <tr>
                    <td colSpan={12}>No record found</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
      </Card>
    </>
  )
}
 
export default Queries
