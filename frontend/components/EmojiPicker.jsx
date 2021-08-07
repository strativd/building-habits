// TODO:
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import 'emoji-mart/css/emoji-mart.css';

import React, { useState, createContext } from 'react';
import { Picker } from 'emoji-mart';
import { Modal, message } from 'antd';
import { useMutation } from '@apollo/client';

import { UPDATE_EMOJI } from './graphql';
import { errorMessages } from '../lib';

const hideButtonProps = {
  style: {
    display: 'none',
  },
};

const IconPicker = ({
  habitRecord,
  editing,
}) => {
  const HabitContext = createContext();

  const [modal, contextHolder] = Modal.useModal();

  const [emoji, setEmoji] = useState({
    native: habitRecord.emoji.native,
    name: habitRecord.emoji.name,
  });

  const [updateHabitEmoji] = useMutation(UPDATE_EMOJI);

  const updateIcon = async (pickerData) => {
    const newEmojiData = {
      variables: {
        ...pickerData,
        emojiId: pickerData.id,
        id: habitRecord.emoji.id,
      },
    };
    console.log(newEmojiData);

    try {
      const { data } = await updateHabitEmoji(newEmojiData);
      const { name, native } = data.updateEmoji;
      message.success(`Saved ${native} for ${habitRecord.title}!`);
      setEmoji({
        native,
        name,
      });
    } catch (error) {
      errorMessages(error.errors, `${emoji.native} Oops! Please try again...`);
    }
  };

  const content = (
    <HabitContext.Consumer>
      {(habit) => (
        <Picker
          theme="dark"
          color="#75B748"
          title="Pick emoji..."
          emoji={habit.emoji.emojiId || 'white_check_mark'}
          habit={habit}
          onSelect={updateIcon}
        />
      )}
    </HabitContext.Consumer>
  );

  const modalConfig = {
    content,
    title: '',
    className: 'emoji-picker-modal',
    autoFocusButton: null,
    closable: true,
    icon: null,
    maskClosable: true,
    width: '500px',
    cancelButtonProps: hideButtonProps,
    okButtonProps: hideButtonProps,
  };

  const showIconPicker = () => {
    if (!editing) modal.info(modalConfig);
  };

  const renderIcon = <span role="img" aria-label={emoji.name}>{emoji.native}</span>;

  const renderIconPicker = (
    <HabitContext.Provider value={habitRecord}>
      <div onClick={showIconPicker}>
        {renderIcon}
      </div>
      {contextHolder}
    </HabitContext.Provider>
  );

  return renderIconPicker;
};

export default IconPicker;
