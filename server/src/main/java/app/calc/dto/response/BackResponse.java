package app.calc.dto.response;

import org.springframework.http.HttpStatus;

public class BackResponse<T> {
    private T entity;
    private HttpStatus status;

    public BackResponse(T entity, HttpStatus status) {
        this.entity = entity;
        this.status = status;
    }

    public T getEntity() {
        return entity;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setEntity(T entity) {
        this.entity = entity;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }
}
