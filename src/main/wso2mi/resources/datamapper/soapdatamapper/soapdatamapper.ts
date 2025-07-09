import * as dmUtils from "./dm-utils";

/*
* title : "root",
* inputType : "JSON",
*/
interface Root {
    name: string
    taxonomy: {
        kingdom: string
        phylum: string
        class: string
        order: string
        family: string
        genus: string
        scientific_name: string
    }
    locations: string[]
    characteristics: {
        prey: string
        name_of_young: string
        group_behavior: string
        estimated_population_size: string
        biggest_threat: string
        most_distinctive_feature: string
        gestation_period: string
        habitat: string
        diet: string
        average_litter_size: string
        lifestyle: string
        common_name: string
        number_of_species: string
        location: string
        slogan: string
        group: string
        color: string
        skin_type: string
        top_speed: string
        lifespan: string
        weight: string
        height: string
        age_of_sexual_maturity: string
        age_of_weaning: string
    }
}

/*
* title : "root",
* outputType : "JSON",
*/
interface OutputRoot {
    name: string
    taxonomy: {
        kingdom: string
        phylum: string
        class: string
        order: string
        family: string
        genus: string
        scientific_name: string
    }
    locations: string[]
    characteristics: {
        prey: string
        name_of_young: string
        group_behavior: string
        estimated_population_size: string
        biggest_threat: string
        most_distinctive_feature: string
        gestation_period: string
        habitat: string
        diet: string
        average_litter_size: string
        lifestyle: string
        common_name: string
        number_of_species: string
        location: string
        slogan: string
        group: string
        color: string
        skin_type: string
        top_speed: string
        lifespan: string
        weight: string
        height: string
        age_of_sexual_maturity: string
        age_of_weaning: string
    }
}



/**
 * functionName : map_S_root_S_root
 * inputVariable : inputroot
*/
export function mapFunction(input: Root[]): OutputRoot[] {
    return input
    .filter(inputItem => inputItem !== null && inputItem.taxonomy.kingdom)
    .map((inputItem) => {
        return {
            name: inputItem.name,
            taxonomy: {
                kingdom: inputItem.taxonomy.kingdom,
                phylum: inputItem.taxonomy.phylum,
                class: inputItem.taxonomy.class,
                order: inputItem.taxonomy.order,
                family: inputItem.taxonomy.family,
                genus: inputItem.taxonomy.genus,
                scientific_name: inputItem.taxonomy.scientific_name
            },
            locations: inputItem.locations,
            characteristics: {
                prey: inputItem.characteristics.prey,
                name_of_young: inputItem.characteristics.name_of_young,
                group_behavior: inputItem.characteristics.group_behavior,
                estimated_population_size: inputItem.characteristics.estimated_population_size,
                biggest_threat: inputItem.characteristics.biggest_threat,
                most_distinctive_feature: inputItem.characteristics.most_distinctive_feature,
                gestation_period: inputItem.characteristics.gestation_period,
                habitat: inputItem.characteristics.habitat,
                diet: inputItem.characteristics.diet,
                average_litter_size: inputItem.characteristics.average_litter_size,
                lifestyle: inputItem.characteristics.lifestyle,
                common_name: inputItem.characteristics.common_name,
                number_of_species: inputItem.characteristics.number_of_species,
                location: inputItem.characteristics.location,
                slogan: inputItem.characteristics.slogan,
                group: inputItem.characteristics.group,
                color: inputItem.characteristics.color,
                skin_type: inputItem.characteristics.skin_type,
                top_speed: inputItem.characteristics.top_speed,
                lifespan: inputItem.characteristics.lifespan,
                weight: inputItem.characteristics.weight,
                height: inputItem.characteristics.height,
                age_of_sexual_maturity: inputItem.characteristics.age_of_sexual_maturity,
                age_of_weaning: inputItem.characteristics.age_of_weaning
            }
        };
    });
}

