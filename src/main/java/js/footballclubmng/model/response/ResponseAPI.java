package js.footballclubmng.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
public class ResponseAPI<T>{
    private int status;
    private String message;
    private T data;


    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private Integer totalRecords;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private Integer totalPage;

    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private Integer totalWeight;


    public ResponseAPI() {
    }

    public ResponseAPI(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public ResponseAPI(int status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public Integer getTotalRecords() {
        return totalRecords;
    }

    public void setTotalRecords(Integer totalRecords) {
        this.totalRecords = totalRecords;
    }

    public Integer getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(Integer totalPage) {
        this.totalPage = totalPage;
    }

    public Integer getTotalWeight() {
        return totalWeight;
    }

    public void setTotalWeight(Integer totalWeight) {
        this.totalWeight = totalWeight;
    }
}
