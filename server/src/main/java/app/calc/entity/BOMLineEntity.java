package app.calc.entity;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "bills_of_materials_lines")
public class BOMLineEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "quantity")
    private double quantity;

    @ManyToOne
    @JoinColumn(name = "material_id")
    private MaterialEntity material;

    @ManyToMany(mappedBy = "bomLines")
    private Set<BOMEntity> bom;

    public BOMLineEntity() {
    }

    public BOMLineEntity(double quantity) {
        this.quantity = quantity;
    }

    public BOMLineEntity(double quantity, MaterialEntity material) {
        this.material = material;
        this.quantity = quantity;
    }

    public long getId() {
        return id;
    }

    public double getQuantity() {
        return quantity;
    }

    public MaterialEntity getMaterial() {
        return material;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public void setMaterial(MaterialEntity material) {
        this.material = material;
    }

    @Override
    public String toString() {
        return String.format("bom line {id: %d, materialID: %d, quantity: %.5f}",
                this.id, this.material.getID(), this.quantity);
    }
}
