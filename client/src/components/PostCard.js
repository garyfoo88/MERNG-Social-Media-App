import React, { useContext } from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import MyPopUp from "../utils/MyPopUp";
function PostCard(props) {
  const {
    body,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    likes,
  } = props.post;

  const { user } = useContext(AuthContext);

  const commentOnPost = () => {};

  return (
    <Card fluid>
      <Card.Content>
        <Image
          src="https://semantic-ui.com/images/avatar/large/elliot.jpg"
          floated="right"
          size="mini"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <MyPopUp content="Comment on post">
          <Button
            labelPosition="right"
            as={Link}
            to={`/posts/${id}`}
            onClick={commentOnPost}
          >
            <Button color="blue" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </MyPopUp>
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
