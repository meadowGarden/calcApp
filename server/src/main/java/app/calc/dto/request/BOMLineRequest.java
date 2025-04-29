package app.calc.dto.request;

import app.calc.entity.BOMEntity;
import app.calc.entity.MaterialEntity;

import java.util.HashSet;
import java.util.Set;

public class BOMLineRequest {
    private double quantity;
    private MaterialEntity material;
    private Set<BOMEntity> bom;

    public BOMLineRequest() {
    }

    public BOMLineRequest(double quantity, MaterialEntity material) {
        this(quantity, material, new HashSet<>());
    }

    public BOMLineRequest(double quantity, MaterialEntity material, Set<BOMEntity> bom) {
        this.quantity = quantity;
        this.material = material;
        this.bom = bom;
    }

    public double getQuantity() {
        return quantity;
    }

    public MaterialEntity getMaterial() {
        return material;
    }

    public Set<BOMEntity> getBom() {
        return bom;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public void setMaterial(MaterialEntity material) {
        this.material = material;
    }

    public void setBom(Set<BOMEntity> bom) {
        this.bom = bom;
    }
}
