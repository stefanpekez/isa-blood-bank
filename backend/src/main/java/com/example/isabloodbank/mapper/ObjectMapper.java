package com.example.isabloodbank.mapper;

import java.util.List;

public interface ObjectMapper<Entity, Dto> {

    Dto entityToDto(Entity entity);

    List<Dto> entityToDtoList(List<Entity> entityList);

    Entity dtoToEntity(Dto dto);

    List<Entity> dtoListToEntityList(List<Dto> dtoList);
}
