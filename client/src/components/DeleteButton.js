import React, { useState } from "react";
import { Card, Grid, Image, Button, Icon, Confirm } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
function DeleteButton(props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { postId } = props.postId;

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: {
      postId,
    },
  });

  return (
    <Button
      as="div"
      color="red"
      floated="right"
      onClick={() => console.log("Delete Post")}
    >
      <Icon name="trash" style={{ margin: 0 }} />
    </Button>
  );
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost($postId: postId)
    }
`;

export default DeleteButton;
