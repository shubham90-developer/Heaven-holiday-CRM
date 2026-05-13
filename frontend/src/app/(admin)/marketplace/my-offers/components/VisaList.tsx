import React from 'react'

const VisaList = () => {
  return (
    <>
          <div className="table-responsive">
                 <table
                className="table table-sm table-bordered mb-0 align-middle"
                style={{tableLayout: "fixed", width:"100%"}}
                >
                      <thead>
                                            <tr style={{fontSize:"10px", whiteSpace:"nowrap"}}>
                                                <th>
                                                   Visas No
                                                </th>
                                                <th>Visa Name</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    <tr style={{fontSize:"10px"}}>
                                                        <td colSpan={2}>No record found</td>
                                                    </tr>
                                                </tbody>

                </table>
            </div>
    </>
  )
}

export default VisaList
