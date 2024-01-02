import { Modal, Button, TextareaAutosize } from "@mui/material";
import { useState } from "react";

interface IProps {
    open: boolean;
    handleClose: () => void;
    handlePostComment: (comment: string) => void;
}

const MaterialUIModal: React.FC<IProps> = ({ open, handleClose, handlePostComment }) => {
    const [comment, setComment] = useState('');

    const handlePost = () => {
        handlePostComment(comment);
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <div className="myModal" style={{ padding: '15%', width: '300px', background: '#fff' }}>
                <TextareaAutosize
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="Enter you Comment"
                    style={{ width: '100%' }}
                    cols={15}
                    maxRows={25}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePost}
                    style={{ marginTop: '10px' }}
                >
                    Post With Comment
                </Button>
            </div>

        </Modal>
    );
};

export default MaterialUIModal;