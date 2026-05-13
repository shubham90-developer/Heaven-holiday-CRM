import { useState } from 'react'
import React from 'react'
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap'
import AddContactModal from './AddContactModal';
import EditContactModal from './EditContactModal';
const Contacts = () => {
  const [addContact,setaddContact] = useState(false);
  const [editContact, seteditContact] = useState(false);
  return (
    <>
      <Card className='p-2'>
        <div className='text-end mb-2'>
          <Button variant='outline-danger' size='sm' 
          style={{fontSize:'10px', fontWeight:'bold'}}
          onClick={() => setaddContact(true)}>
          Add Contacts
          </Button>
        </div>
        {addContact && <AddContactModal onClose={() => setaddContact(false)}  />}
        <div className='table-responsive'>
             <table
                    className="table table-sm table-bordered mb-0 align-middle "
                    style={{ tableLayout: "fixed", width: "100%" }}
                  >
                    <thead >
                        <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                            <th><span>Contacts</span></th>
                        </tr>
                      <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }} className='bg-light'>
                      
        
                        <th style={{ width: "100px" }}>Customer Name</th>
        
                        <th style={{ width: "260px" }}>Email</th>
        
                        <th style={{ width: "140px" }}>Mobile</th>
        
                        <th style={{ width: "110px" }}>Relation</th>
                        <th style={{ width: "110px" }}>Passport Number</th>
                        <th style={{ width: "110px" }}>Documents</th>
                        <th style={{ width: "110px" }}>Status</th>
    
                        <th style={{ width: "70px" }} className="text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
        
                    <tbody style={{ fontSize: "12px" }}>
                      <tr>
                 
                  <td>Mr. The Wind Dreams</td>
                  <td>9371759599.aheaven@gmail.com</td>
                  <td>+919371759599</td>
                  <td>NA</td>
                  <td></td>
                  <td>Add</td>
                  <td>Active</td>
                  <td><div style={{cursor:"pointer"}}><Icon icon="mdi:pencil" onClick={() => seteditContact(true)} style={{cursor:"pointer"}}/></div></td>
                      </tr>
                    </tbody>
                  </table>
                  {editContact && <EditContactModal onClose={() => seteditContact(false)}/>}
        </div>
        </Card>
    </>
  )
}

export default Contacts
