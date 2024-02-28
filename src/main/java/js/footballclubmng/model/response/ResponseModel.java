package js.footballclubmng.dto;


public class ResponseModel {

        private String status;
        private String message;
        private Object data;

        public ResponseModel() {

            }

    public ResponseModel(String status, String message, Object data) {
                    this.status = status;
                    this.message = message;
                    this.data = data;

