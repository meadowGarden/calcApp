package app.calc.entity;

import jakarta.persistence.*;

import java.util.Objects;

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

    @ManyToOne
    @JoinColumn(name = "bom_id")
    private BOMEntity bom;

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

    public void setBom(BOMEntity bom) {
        this.bom = bom;
    }

    @Override
    public String toString() {
        return String.format("bom line {id: %d, materialID: %d, quantity: %.5f}",
                this.id, this.material.getID(), this.quantity);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass())
            return false;

        final BOMLineEntity that = (BOMLineEntity) o;

        if (this.id != 0 && that.getId() != 0)
            return this.id == that.id;

        return Objects.equals(material, that.getMaterial()) && this.quantity == that.getQuantity();
    }

    @Override
    public int hashCode() {
        if (id != 0)
            return Long.hashCode(id);

        return Objects.hash(this.material, this.quantity);
    }
}
