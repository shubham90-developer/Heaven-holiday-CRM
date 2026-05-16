"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Button, Modal, Table, Badge } from "react-bootstrap";
import SendMessageModal from "./SendMessageModal";
import {
  useGetProposalsByQueryQuery,
  useSendProposalMutation,
  useAcceptProposalMutation,
  useRejectProposalMutation,
} from "../../../../../../Redux/proposalApi";

interface Props {
  queryId: string;
}

const ProposalModal: React.FC<Props> = ({ queryId }) => {
  const [show, setShow] = useState(false);

  const {
    data: proposalData,
    isLoading,
    refetch,
  } = useGetProposalsByQueryQuery(queryId, {
    skip: !show, // only fetch when modal is open
  });

  const [sendProposal] = useSendProposalMutation();
  const [acceptProposal] = useAcceptProposalMutation();
  const [rejectProposal] = useRejectProposalMutation();

  const proposals = proposalData?.data ?? [];

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "NA";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });
  };

  const getTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}H ${mins}M`;
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      draft: "secondary",
      sent: "primary",
      accepted: "success",
      rejected: "danger",
    };
    return map[status] ?? "secondary";
  };

  const handleSend = async (id: string) => {
    await sendProposal(id);
    refetch();
  };

  const handleAccept = async (id: string) => {
    await acceptProposal(id);
    refetch();
  };

  const handleReject = async (id: string) => {
    await rejectProposal(id);
    refetch();
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        size="sm"
        variant="link"
        style={{ fontSize: "10px", padding: 0 }}
        onClick={() => setShow(true)}
      >
        {proposals.length > 0
          ? `${proposals.length} (View Proposal)`
          : "View Proposals"}
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={() => setShow(false)} size="xl" centered>
        <Modal.Header
          style={{
            background: "#274c6b",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Modal.Title style={{ fontSize: "16px" }}>View Proposals</Modal.Title>
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

        <Modal.Body>
          {isLoading ? (
            <div className="text-center py-4">
              <div className="spinner-border spinner-border-sm text-primary" />
            </div>
          ) : proposals.length === 0 ? (
            <p
              className="text-center text-muted py-4"
              style={{ fontSize: "12px" }}
            >
              No proposals yet for this query.
            </p>
          ) : (
            <Table bordered hover style={{ fontSize: "10px" }}>
              <thead>
                <tr>
                  <th>Proposal Date / Age</th>
                  <th>Proposal ID</th>
                  <th>Travel Details</th>
                  <th>Type</th>
                  <th>No. of Pax</th>
                  <th>Destinations</th>
                  <th>Offer Price</th>
                  <th>Stage</th>
                  <th>Last Updated</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {proposals.map((proposal) => (
                  <tr key={proposal._id}>
                    {/* Date */}
                    <td>
                      <div>{formatDate(proposal.createdAt)}</div>
                      <div className="text-muted">
                        {getTimeAgo(proposal.createdAt)}
                      </div>
                    </td>

                    {/* Proposal ID */}
                    <td>
                      <div>{proposal._id.slice(-8).toUpperCase()}</div>
                      <div className="text-muted">Q:{queryId.slice(-7)}</div>
                    </td>

                    {/* Travel Details */}
                    <td>
                      <div>{formatDate(proposal.createdAt)}</div>
                    </td>

                    {/* Type */}
                    <td>{proposal.packageDetails?.notes ?? "Package"}</td>

                    {/* Pax */}
                    <td>{proposal.leadId?.customerName ?? "NA"}</td>

                    {/* Destinations */}
                    <td>
                      {proposal.packageDetails?.hotels?.join(", ") ?? "NA"}
                    </td>

                    {/* Price */}
                    <td>
                      <div>INR {proposal.totalPrice?.toLocaleString()}</div>
                      <div className="text-muted" style={{ fontSize: "9px" }}>
                        Base: {proposal.basePrice?.toLocaleString()}
                        {proposal.markup > 0 && ` + ${proposal.markup} markup`}
                      </div>
                    </td>

                    {/* Stage */}
                    <td>
                      <Badge
                        bg={getStatusBadge(proposal.status)}
                        style={{ fontSize: "9px" }}
                      >
                        {proposal.status.charAt(0).toUpperCase() +
                          proposal.status.slice(1)}
                      </Badge>
                      {proposal.sentAt && (
                        <div className="text-muted" style={{ fontSize: "9px" }}>
                          Sent: {formatDate(proposal.sentAt)}
                        </div>
                      )}
                    </td>

                    {/* Last Updated */}
                    <td>{formatDate(proposal.createdAt)}</td>

                    {/* Actions */}
                    <td>
                      <div className="d-flex flex-column gap-1">
                        {/* Send */}
                        {proposal.status === "draft" && (
                          <Button
                            variant="primary"
                            size="sm"
                            style={{ fontSize: "9px" }}
                            onClick={() => handleSend(proposal._id)}
                          >
                            Send
                          </Button>
                        )}

                        {/* Accept */}
                        {proposal.status === "sent" && (
                          <Button
                            variant="success"
                            size="sm"
                            style={{ fontSize: "9px" }}
                            onClick={() => handleAccept(proposal._id)}
                          >
                            Accept
                          </Button>
                        )}

                        {/* Reject */}
                        {(proposal.status === "sent" ||
                          proposal.status === "draft") && (
                          <Button
                            variant="danger"
                            size="sm"
                            style={{ fontSize: "9px" }}
                            onClick={() => handleReject(proposal._id)}
                          >
                            Reject
                          </Button>
                        )}

                        {/* View */}
                        <Button
                          variant="success"
                          size="sm"
                          style={{ fontSize: "9px" }}
                          title="View"
                        >
                          <Icon icon="mdi:eye-outline" />
                        </Button>

                        <SendMessageModal />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProposalModal;
