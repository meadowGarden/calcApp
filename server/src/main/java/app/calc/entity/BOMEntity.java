package app.calc.entity;

import app.calc.utils.UnitOfMeasurement;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "bills_of_materials")
public class BOMEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "uom")
    @Enumerated(EnumType.STRING)
    private UnitOfMeasurement uom;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(
            name = "bom_lines",
            joinColumns = @JoinColumn(name = "bom_id"),
            inverseJoinColumns = @JoinColumn(name = "bom_line_id"))
    private Set<BOMLineEntity> bomLines;

    public BOMEntity() {
    }

    public BOMEntity(String name, String description, UnitOfMeasurement uom, Set<BOMLineEntity> bomLines) {
        this.name = name;
        this.description = description;
        this.uom = uom;
        this.bomLines = bomLines;
    }

    public BOMEntity(long id, String name, String description, UnitOfMeasurement uom, Set<BOMLineEntity> bomLines) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.uom = uom;
        this.bomLines = bomLines;
    }

    public long getId() {
        return id;
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

    @Override
    public String toString() {
        return String.format("bom {id: %d, name: %s, description: %s, uom: %s, bomLines: %s}",
                id, name, description, uom, bomLines);
    }
}
