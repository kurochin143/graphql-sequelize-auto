
- Publish npm package
- Currently only supports hasMany and belongsTo or oneToMany/manyToOne
- Optional required fields. Rationale, fill it out manually in the resolver
- Required optional fields
- Separate edit associatedFields into add/edit/editOrRemove/addOrEditOrRemove. Rationale, sometimes you don't want to edit fields after adding
- Separate aliasName from get, add, edit, remove. Only get should have aliasName (or add?)
- On edit/add associatedFields, remove the parent's primary key on primaryFields
- Restrict filter operators
- Required filter***
- Validation error reporting, the word output/input is missing
- isEnum field. Don't forget sequelize class
- Sequelize-auto does not support compound foreign key. All targetKey is pointing to the first targetKey
- Edit/remove isStrict, the filter count should be to edited/removed count. Triggers with update/?delete? will add the update/?delete? count
- canPaginate default to false
- Manual associatedField isArray false. For m2m tables that's actually o2o to o2o to o2o
- Designate a table as enum, generate enum based on that table's rows, use that enum as type
- Ddd without input throws an error
- Pass additional codegen config in gsaConfig
- Edit/remove custom output
- Might wanna return edit/remove by other fields than primary key fields. Useful for one to one tables
- Flat/custom filter, you write the filter function (id === eqId && name like likeName)) in the config, the schema does not generate { and:[] , or:[] }, only { eqId: number , likeName: string }
- Do not add comment in query/mutation if there's no query/mutation
- Self one to many, eg. users.users and users.user
- Sequelize-auto nullable associated fields
- Generate class without functions to prevent devs from using the one with functions
- Sub filter/orderBy/pagination
- Rename variable names "raw" to associatedFieldInfo
- Currently only supports snake_case db names
- Automatically separate deep nested fields into separate queries. see @separators in gsaService. make sure to limit the level of nesting to prevent breaking the api, set default
- Add additionAssociations types to the sequelize class
- AdditionAssociations oneToMany
- Rename primary to primitive