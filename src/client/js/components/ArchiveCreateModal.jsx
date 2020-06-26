import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import AppContainer from '../services/AppContainer';
import { withUnstatedContainers } from './UnstatedUtils';
import { toastSuccess, toastError } from '../util/apiNotification';

const ArchiveCreateModal = (props) => {
  const { t, appContainer } = props;
  const [isCommentDownload, setIsCommentDownload] = useState(false);
  const [isFileDownload, setIsFileDownload] = useState(false);
  const [isSubordinatedPageDownload, setIsSubordinatedPageDownload] = useState(false);

  const [fileType, setFileType] = useState('markDown');


  function changeIsCommentDownloadHandler() {
    setIsCommentDownload(!isCommentDownload);
  }
  function changeIsFileDownloadHandler() {
    setIsFileDownload(!isFileDownload);
  }

  function changeIsSubordinatedPageDownloadHandler() {
    setIsSubordinatedPageDownload(!isSubordinatedPageDownload);
  }

  function closeModalHandler() {
    if (props.onClose == null) {
      return;
    }

    props.onClose();
  }

  const handleChangeFileType = useCallback(
    (filetype) => {
      setFileType(filetype);
    },
    [],
  );

  async function done() {

    try {
      await appContainer.apiv3Post('/page/archive', { bool: true, pageId: '1' });
      toastSuccess('Rebuildin is requested');
    }
    catch (e) {
      toastError(e);
    }
  }


  return (
    <Modal size="lg" isOpen={props.isOpen} toggle={closeModalHandler}>
      <ModalHeader tag="h4" toggle={closeModalHandler} className="bg-primary text-white">
        {t('Create Archive Page')}
      </ModalHeader>
      <ModalBody>
        <div className="form-group">
          <div className="form-group">
            <label>{t('Target page')}</label>
            <br />
            <code>{props.path}</code>
          </div>

          <div className="custom-control-inline">
            <label>{t('File type')}: </label>
          </div>
          <div className="custom-control custom-radio custom-control-inline ">
            <input
              type="radio"
              className="custom-control-input"
              id="customRadio1"
              name="isFileType"
              value="customRadio1"
              checked={fileType === 'markDown'}
              onChange={() => {
                handleChangeFileType('markDown');
              }}
            />
            <label className="custom-control-label" htmlFor="customRadio1">
              MarkDown(.md)
            </label>
          </div>

          <div className="custom-control custom-radio custom-control-inline ">
            <input
              type="radio"
              className="custom-control-input"
              id="customRadio2"
              name="isFileType"
              value="customRadio2"
              checked={fileType === 'pdf'}
              onChange={() => {
                handleChangeFileType('pdf');
              }}
            />
            <label className="custom-control-label" htmlFor="customRadio2">
              PDF(.pdf)
            </label>
          </div>
        </div>

        <div className="custom-control custom-checkbox custom-checkbox-warning">
          <input
            className="custom-control-input"
            name="comment"
            id="commentFile"
            type="checkbox"
            checked={isCommentDownload}
            onChange={changeIsCommentDownloadHandler}
          />
          <label className="custom-control-label" htmlFor="commentFile">
            {t('Include Comment')}
          </label>
        </div>
        <div className="custom-control custom-checkbox custom-checkbox-warning">
          <input
            className="custom-control-input"
            id="downloadFile"
            type="checkbox"
            checked={isFileDownload}
            onChange={changeIsFileDownloadHandler}
          />
          <label className="custom-control-label" htmlFor="downloadFile">
            {t('Include Attachment File')}
          </label>
        </div>
        <div className="custom-control custom-checkbox custom-checkbox-warning">
          <input
            className="custom-control-input"
            id="subordinatedFile"
            type="checkbox"
            checked={isSubordinatedPageDownload}
            onChange={changeIsSubordinatedPageDownloadHandler}
          />
          <label className="custom-control-label" htmlFor="subordinatedFile">
            {t('Include Subordinated Page')}
          </label>
        </div>
      </ModalBody>
      <ModalFooter>
        <button type="button" className="btn btn-primary" onClick={done}>
          Done
        </button>
      </ModalFooter>
    </Modal>
  );
};

const ArchiveCreateModalWrapper = withUnstatedContainers(ArchiveCreateModal, [AppContainer]);

ArchiveCreateModal.propTypes = {
  t: PropTypes.func.isRequired, //  i18next
  appContainer: PropTypes.instanceOf(AppContainer).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  path: PropTypes.string.isRequired,
};


export default withTranslation()(ArchiveCreateModalWrapper);
