package app.calc.dto.response;

import org.springframework.http.HttpStatus;

import java.util.List;

public class BackListResponse<T> {
    private List<T> entities;
    private HttpStatus status;

    public BackListResponse(List<T> entities, HttpStatus status) {
        this.entities = entities;
        this.status = status;
    }

    public List<T> getEntities() {
        return entities;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setEntities(List<T> entities) {
        this.entities = entities;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }
}
