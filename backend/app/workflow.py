from .models import WorkflowStatus

WORKFLOW_MAP = {
    WorkflowStatus.draft: ["SUBMIT"],
    WorkflowStatus.submitted: ["REVIEW"],
    WorkflowStatus.review: ["COMMENT", "APPROVE"],
    WorkflowStatus.commented: ["RESUBMIT"],
    WorkflowStatus.resubmitted: ["REVIEW"],
    WorkflowStatus.approved: ["CLOSE"],
    WorkflowStatus.closed: [],
}

NEXT_STATE = {
    "SUBMIT": WorkflowStatus.submitted,
    "REVIEW": WorkflowStatus.review,
    "COMMENT": WorkflowStatus.commented,
    "RESUBMIT": WorkflowStatus.resubmitted,
    "APPROVE": WorkflowStatus.approved,
    "CLOSE": WorkflowStatus.closed,
}


def can_transition(current_state: WorkflowStatus, action: str) -> bool:
    return action in WORKFLOW_MAP[current_state]


def next_state(action: str) -> WorkflowStatus:
    return NEXT_STATE[action]
