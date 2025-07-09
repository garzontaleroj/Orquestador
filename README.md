# Orquestador - Proyecto de Integraci&oacute;n WSO2 MI

## Descripci&oacute;n
Orquestador es un proyecto de integraci&oacute;n basado en WSO2 Micro Integrator (MI) que proporciona servicios de orquestaci&oacute;n para el consumo de APIs externas y gesti&oacute;n de datos empresariales. El proyecto implementa una arquitectura de microservicios que permite la integraci&oacute;n de m&uacute;ltiples fuentes de datos y servicios externos.

## Caracter&iacute;sticas Principales

- **Orquestaci&oacute;n de APIs**: Combina m&uacute;ltiples servicios externos en una sola respuesta
- **Gesti&oacute;n de Archivos**: Capacidad de escribir archivos en sistemas SFTP
- **Datos Empresariales**: Gesti&oacute;n de informaci&oacute;n de empleados y usuarios
- **Conectores Integrados**: Utiliza conectores WSO2 para HTTP y manejo de archivos
- **Arquitectura Escalable**: Basado en WSO2 Micro Integrator para alta disponibilidad

## Estructura del Proyecto

![Diagrama de Recursos WSO2 MI](MI-resource-diagram.jpeg)

```
Orquestador/
├── src/main/wso2mi/
│   ├── artifacts/
│   │   ├── apis/                    # APIs REST expuestas
│   │   ├── endpoints/               # Endpoints de configuraci&oacute;n
│   │   ├── sequences/               # Secuencias de mediaci&oacute;n
│   │   ├── proxy-services/          # Servicios proxy
│   │   └── ...
│   └── resources/
│       ├── conf/                    # Archivos de configuraci&oacute;n
│       ├── connectors/              # Conectores personalizados
│       └── metadata/                # Metadatos del proyecto
├── connector/                       # M&oacute;dulo de conectores
├── deployment/                      # Configuraci&oacute;n de despliegue
│   ├── deployment.toml             # Configuraci&oacute;n principal
│   ├── connector_exporter.xml      # Configuraci&oacute;n de conectores
│   └── docker/                     # Configuraci&oacute;n Docker
├── target/                         # Archivos compilados
└── pom.xml                         # Configuraci&oacute;n Maven
```

## APIs Disponibles

### OrquestadorAPI

**Base URL**: `/orquestador`

#### 1. Endpoint de Consulta
- **URL**: `GET /orquestador/consultar`
- **Descripci&oacute;n**: Orquesta llamadas a APIs externas de animales y hobbies, combina las respuestas y guarda el resultado en un archivo SFTP
- **Funcionalidades**:
  - Consulta API de animales (api.api-ninjas.com)
  - Consulta API de hobbies (api.api-ninjas.com)
  - Combina las respuestas en formato JSON
  - Genera timestamp &uacute;nico para el archivo
  - Guarda el resultado en SFTP con nombre `resultado_YYYYMMDD_HHMMSS.json`

**Ejemplo de Respuesta**:
```json
{
  "mensaje": "Archivo SFTP generado correctamente",
  "archivo": "resultado_20250709_143022.json"
}
```

#### 2. Endpoint de Usuarios
- **URL**: `GET /orquestador/usuarios`
- **Descripci&oacute;n**: Retorna una lista predefinida de usuarios con informaci&oacute;n empresarial
- **Campos de Respuesta**:
  - `nombre_completo`: Nombre completo del empleado
  - `cargo`: Posici&oacute;n en la empresa
  - `anio_ingreso`: A&ntilde;o de ingreso a la empresa
  - `salario`: Salario en pesos colombianos
  - `sexo`: G&eacute;nero (M/F)
  - `experiencia`: A&ntilde;os de experiencia

**Ejemplo de Respuesta**:
```json
[
  {
    "nombre_completo": "Laura Martínez",
    "cargo": "Analista de Datos",
    "anio_ingreso": 2018,
    "salario": 4200000,
    "sexo": "F",
    "experiencia": 5
  },
  ...
]
```

## Dependencias y Conectores

### Conectores WSO2
- **mi-connector-file (5.0.0)**: Manejo de archivos y operaciones SFTP
- **mi-connector-http (0.1.11)**: Comunicación HTTP con servicios externos

### APIs Externas
- **API Ninjas**: Proveedor de datos para animales y hobbies
  - Base URL: `https://api.api-ninjas.com/v1/`
  - Autenticaci&oacute;n: API Key

## Configuraci&oacute;n

### Configuraci&oacute;n Principal (deployment.toml)
```toml
[server]
hostname = "localhost"

[keystore.primary]
file_name = "repository/resources/security/wso2carbon.jks"
password = "wso2carbon"
alias = "wso2carbon"
key_password = "wso2carbon"

[truststore]
file_name = "repository/resources/security/client-truststore.jks"
password = "wso2carbon"
```

### Configuraci&oacute;n de Conectores
El proyecto utiliza el conector SFTP configurado en `connector_exporter.xml` para operaciones de escritura de archivos.

## Compilaci&oacute;n y Despliegue

### Prerrequisitos
- Java 8 o superior
- Maven 3.6+
- WSO2 Micro Integrator 4.4.0

### Compilaci&oacute;n
```bash
mvn clean compile
```

### Generaci&oacute;n de Artefactos
```bash
mvn clean package
```

### Despliegue con Docker
```bash
docker build -t orquestador:latest deployment/docker/
docker run -p 8290:8290 orquestador:latest
```

## Uso

### Desarrollo Local
1. Importar el proyecto en WSO2 Integration Studio
2. Configurar las credenciales de API en las propiedades del proyecto
3. Configurar la conexi&oacute;n SFTP en los conectores
4. Ejecutar el proyecto en el servidor integrado

### Llamadas de Prueba
```bash
# Consultar orquestaci&oacute;n
curl -X GET http://localhost:8290/orquestador/consultar

# Obtener lista de usuarios
curl -X GET http://localhost:8290/orquestador/usuarios
```

## Arquitectura T&eacute;cnica

### Flujo de Orquestaci&oacute;n
1. **Recepci&oacute;n de Request**: El cliente invoca el endpoint `/consultar`
2. **Llamada API Externa 1**: Consulta informaci&oacute;n de animales
3. **Llamada API Externa 2**: Consulta informaci&oacute;n de hobbies
4. **Combinaci&oacute;n de Respuestas**: Une las respuestas en un JSON estructurado
5. **Generaci&oacute;n de Archivo**: Crea archivo con timestamp &uacute;nico
6. **Almacenamiento SFTP**: Guarda el archivo en el servidor SFTP
7. **Respuesta al Cliente**: Confirma la operaci&oacute;n exitosa

### Patrones de Integraci&oacute;n
- **Content Enricher**: Combina m&uacute;ltiples fuentes de datos
- **Message Translator**: Transforma formatos de mensaje
- **File Transfer**: Manejo de archivos con conectores
- **Service Orchestration**: Coordinaci&oacute;n de servicios m&uacute;ltiples

## Monitoreo y Logs

### Configuraci&oacute;n de Logs
El proyecto incluye logging completo habilitado en la API:
- `statistics="enable"`
- `trace="enable"`
- Logs de nivel INFO para operaciones cr&iacute;ticas

### M&eacute;tricas
- Tiempo de respuesta de APIs externas
- &Eacute;xito/fallo de operaciones SFTP
- Estad&iacute;sticas de uso por endpoint

## Seguridad

### Autenticaci&oacute;n
- API Key para servicios externos
- Keystore y Truststore configurados para comunicaciones seguras

### Configuraci&oacute;n SSL/TLS
- Certificados en `deployment/docker/resources/`
- Configuraci&oacute;n en `deployment.toml`

## Mantenimiento

### Actualizaci&oacute;n de Conectores
Los conectores se actualizan modificando las versiones en `pom.xml` y recompilando el proyecto.

### Configuraci&oacute;n de Entornos
- Desarrollo: `deployment.toml` local
- Producci&oacute;n: Variables de entorno Docker

## Licencia
Este proyecto est&aacute; desarrollado para uso interno empresarial.

## Contacto
Para soporte t&eacute;cnico o consultas sobre el proyecto, contactar al equipo de integraci&oacute;n.
