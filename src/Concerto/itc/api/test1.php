<?php

//responseデータ
class ApiResponseDataSet
{
    //@var ApiResponseDataSet[]
    public array $data;

}

class ApiResponseData
{
    
    public string $name;

    //@var Field[]
    public array $fields;

    public DataType $dataType;

    //@var array[]
    public array $data;
}

class Field
{
    public string $name;

    public DataType $type;

    public string $description;
}

enum DataType
{
    case BOOL = 'bool';
    case INTEGER = 'integer';
    case FLOAT = 'float';
    case STRING = 'string';
    case DATE = 'date';
    case ARRAY = 'array';
    case OBJECT = 'object';
    case NULL = 'null';
}




