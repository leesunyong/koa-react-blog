import React from 'react'

export const mediaBlockRenderer = (block) => {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }

  return null;
}

const Audio = (props) => {
  // note: requires embed url from embed code
  return <iframe controls src={props.src} allow="autoplay; encrypted-media" title="audio"/>;
};

const Image = (props) => {
  if (!!props.src) {
    return <img src={props.src} alt=""/>;
  }
  return null
};

const Video = (props) => {
  // return <iframe controls src={props.src} />;

  // note: requires embed url from embed code
  return <iframe src={props.src} frameborder="0" allow="autoplay; encrypted-media" title="video"></iframe>
};

const Media = (props) => {
  const entity = props.contentState.getEntity(
    props.block.getEntityAt(0)
  );
  const {src} = entity.getData();
  const type = entity.getType();

  let media;
  if (type === 'audio') {
    media = <Audio src={src} />;
  } else if (type === 'image') {
    media = <Image src={src} />;
  } else if (type === 'video') {
    media = <Video src={src} />;
  }


  return media;
};