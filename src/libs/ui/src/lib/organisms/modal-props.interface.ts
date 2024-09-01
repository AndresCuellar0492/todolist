export interface ModalProps {
  /*   title: string;
  imgPath?: string;
  content: string;
  link?: ModalLink;
  buttons: ModalButton[]; */
  fullPageDismiss?: boolean;
  nativeBackButtonAction?: () => void;
  disableBackButton?: boolean;
  backdropDismiss?: boolean;
}
