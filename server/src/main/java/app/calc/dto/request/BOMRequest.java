package app.calc.dto.request;

import app.calc.entity.BOMLineEntity;
import app.calc.utils.UnitOfMeasurement;

import java.util.Set;

public class BOMRequest {
    private String name;
    private String description;
    private UnitOfMeasurement uom;
    private Set<BOMLineEntity> bomLines;

    public BOMRequest(String name, String description, UnitOfMeasurement uom, Set<BOMLineEntity> bomLines) {
        this.name = name;
        this.description = description;
        this.uom = uom;
        this.bomLines = bomLines;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public UnitOfMeasurement getUOM() {
        return uom;
    }

    public Set<BOMLineEntity> getBomLines() {
        return bomLines;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setUOM(UnitOfMeasurement uom) {
        this.uom = uom;
    }

    public void setBomLines(Set<BOMLineEntity> bomLines) {
        this.bomLines = bomLines;
    }
}
