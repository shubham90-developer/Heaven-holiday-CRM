"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";

const PriceModal = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      {/* BUTTON */}
      <Button
        size="sm"
        onClick={() => setShow(true)}
        style={{ fontSize: "10px" }}
        variant="link"
      >
        View
      </Button>

      {/* ================= HISTORY MODAL ================= */}
      <Modal show={show} onHide={() => setShow(false)} size="xl" centered>
        <Modal.Header
          style={{
            background: "#274c6b",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Modal.Title>Price Details</Modal.Title>

          <button
            onClick={() => setShow(false)}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </Modal.Header>

        <Modal.Body style={{ fontSize: "11px" }}>
          {/* Top Radio Options */}
          <div className="d-flex gap-4 mb-3">
            <Form.Check
              type="radio"
              name="type"
              label="Confirmation To Supplier"
              defaultChecked
            />
            <Form.Check type="radio" name="type" label="Availability Check" />
            <Form.Check type="radio" name="type" label="Booking Confirmation" />
          </div>

          {/* Services Table */}
          <Table bordered size="sm">
            <thead>
              <tr>
                <th>Services</th>
                <th>Select</th>
                <th>Supplier</th>
                <th>My Cost</th>
                <th>Mark Up</th>
                <th>Taxes</th>
                <th>Sales Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Package (Hotel + Transfer + Sightseeing)</td>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>A HEAVEN HOLIDAY</td>
                <td>INR 622500</td>
                <td></td>
                <td></td>
                <td>INR 622500</td>
              </tr>
              <tr>
                <td>Flight</td>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>A HEAVEN HOLIDAY</td>
                <td>INR 281930</td>
                <td>INR 20000</td>
                <td>INR 3600</td>
                <td>INR 285530</td>
              </tr>
              <tr>
                <td>
                  <b>Total Package Cost</b>
                </td>
                <td colSpan={5}></td>
                <td>
                  <b>INR 914030</b>
                </td>
              </tr>
            </tbody>
          </Table>

          {/* Hotels Section */}
          <h6 className="mt-3">Hotel(s)</h6>
          <Table bordered size="sm">
            <thead>
              <tr>
                <th>Hotel(s)</th>
                <th>Select</th>
                <th>Supplier</th>
                <th>My Cost</th>
                <th>Mark Up</th>
                <th>Taxes</th>
                <th>Sales Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Centara Nova Hotel And Spa <br />
                  Pattaya (Deluxe/ Selected Markets) <br />- Standard (Pattaya)
                </td>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>A HEAVEN HOLIDAY</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>
                  Aiyara Grand Hotel Pattaya - <br /> Standard (Pattaya) Hold
                  Request
                </td>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>A HEAVEN HOLIDAY</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </tbody>
          </Table>

          {/* Sightseeing */}
          <h6 className="mt-3">Sightseeing(s)</h6>
          <Table bordered size="sm">
            <thead>
              <tr>
                <th>Sightseeing(s)</th>
                <th>Select</th>
                <th>Supplier</th>
                <th>My Cost</th>
                <th>Mark Up</th>
                <th>Taxes</th>
                <th>Sales Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>69 Show (PVT) (Pattaya) (Adult : 10)</td>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>A HEAVEN HOLIDAY</td>
                <td>INR 00</td>
                <td>INR 00</td>
                <td>0</td>
                <td>INR 00</td>
              </tr>
              <tr>
                <td>Coral Island (PVT) (Pattaya) (Adult : 10)</td>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>A HEAVEN HOLIDAY</td>
                <td>INR 00</td>
                <td>INR 00</td>
                <td>0</td>
                <td>INR 00</td>
              </tr>
              <tr>
                <td>POOL PARTY PATTAYA (PVT) (Pattaya) (Adult : 10)</td>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>A HEAVEN HOLIDAY</td>
                <td>INR 00</td>
                <td>INR 00</td>
                <td>0</td>
                <td>INR 00</td>
              </tr>
              <tr>
                <td>Nong Nooch Tropical Garden (PVT) (Pattaya) (Adult : 10)</td>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>A HEAVEN HOLIDAY</td>
                <td>INR 00</td>
                <td>INR 00</td>
                <td>0</td>
                <td>INR 00</td>
              </tr>
            </tbody>
          </Table>

          {/* Transfers */}
          <h6 className="mt-3">Transfer(s)</h6>
          <Table bordered size="sm">
            <thead>
              <tr>
                <th>Transfer(s)</th>
                <th>Select</th>
                <th>Supplier</th>
                <th>My Cost</th>
                <th>Mark Up</th>
                <th>Taxes</th>
                <th>Sales Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Airport Transfer: Hace</td>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>A HEAVEN HOLIDAY</td>
                <td>INR 7500</td>
                <td>INR 1000</td>
                <td></td>
                <td>INR 8500</td>
              </tr>
              <tr>
                <td>Pvt as per Itinerary:</td>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>A HEAVEN HOLIDAY</td>
                <td>INR 7500</td>
                <td>INR 1000</td>
                <td></td>
                <td>INR 8500</td>
              </tr>
              <tr>
                <td>Pvt as per Itinerary:</td>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>A HEAVEN HOLIDAY</td>
                <td>INR 7500</td>
                <td>INR 1000</td>
                <td></td>
                <td>INR 8500</td>
              </tr>
              <tr>
                <td>Airport Transfer:</td>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>A HEAVEN HOLIDAY</td>
                <td>INR 7500</td>
                <td>INR 1000</td>
                <td></td>
                <td>INR 8500</td>
              </tr>
            </tbody>
          </Table>

          {/* Meals */}
          <h6 className="mt-3">Meal(s)</h6>
          <Table bordered size="sm">
            <thead>
              <tr>
                <th>Meal(s)</th>
                <th>Select</th>
                <th>Supplier</th>
                <th>My Cost</th>
                <th>Mark Up</th>
                <th>Taxes</th>
                <th>Sales Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Break Fast - AI</td>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>A HEAVEN HOLIDAY</td>
                <td>INR 0</td>
                <td>-</td>
                <td>INR 0</td>
                <td>INR 0</td>
              </tr>
              <tr>
                <td>Lunch - AI</td>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>A HEAVEN HOLIDAY</td>
                <td>INR 0</td>
                <td>-</td>
                <td>INR 0</td>
                <td>INR 0</td>
              </tr>
              <tr>
                <td>Dinner - AI</td>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>A HEAVEN HOLIDAY</td>
                <td>INR 0</td>
                <td>-</td>
                <td>INR 0</td>
                <td>INR 0</td>
              </tr>
              <tr>
                <td>Break Fast - AI</td>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>A HEAVEN HOLIDAY</td>
                <td>INR 0</td>
                <td>-</td>
                <td>INR 0</td>
                <td>INR 0</td>
              </tr>
              <tr>
                <td>Lunch - AI</td>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>A HEAVEN HOLIDAY</td>
                <td>INR 0</td>
                <td>-</td>
                <td>INR 0</td>
                <td>INR 0</td>
              </tr>
              <tr>
                <td>Break Fast - AI</td>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>A HEAVEN HOLIDAY</td>
                <td>INR 0</td>
                <td>-</td>
                <td>INR 0</td>
                <td>INR 0</td>
              </tr>
              <tr>
                <td>Dinner - AI</td>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>A HEAVEN HOLIDAY</td>
                <td>INR 0</td>
                <td>-</td>
                <td>INR 0</td>
                <td>INR 0</td>
              </tr>
              <tr>
                <td>Break Fast - AI</td>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>A HEAVEN HOLIDAY</td>
                <td>INR 0</td>
                <td>-</td>
                <td>INR 0</td>
                <td>INR 0</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PriceModal;
