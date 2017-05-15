export class ResourceApiStubs {

    static RESOURCE_LIST() {
        return {
            "items": [
                {
                    "type": "ResourceMetadataSummary",
                    "properties": {
                        "Name": "AssetChangeCodeAndDescription"
                    },
                    "links": [
                        {
                            "href": "api/clients/Contoso/test/Resources/AssetChangeCodeAndDescription",
                            "method": "GET",
                            "rel": "ResourceSchema"
                        }
                    ],
                    "actions": []
                },
                {
                    "type": "ResourceMetadataSummary",
                    "properties": {
                        "Name": "DefaultAsset"
                    },
                    "links": [
                        {
                            "href": "api/clients/Contoso/test/Resources/DefaultAsset",
                            "method": "GET",
                            "rel": "ResourceSchema"
                        }
                    ],
                    "actions": []
                }],
            "links": [],
            "actions": []
        } ;
    }

    static GET_METADATA() {
        return {
            "type": "StaffMemberResourceMetadata",
            "name": "StaffMember",
            "endpoint": {
                "doc": "api/clients/Contoso/test/Resources/DefaultStaffMember",
                "href": "api/clients/Contoso/test/StaffMembers/{id:long}",
                "method": "GET",
                "rel": "GetById",
                "type": 0
            },
            "self": {
                "href": "api/clients/Contoso/test/Resources/DefaultStaffMember",
                "method": "GET",
                "rel": "ResourceSchema"
            },
            "properties": [
                {
                    "dataType": "String",
                    "format": 0,
                    "name": "Code",
                    "path": "Code",
                    "validations": []
                },
                {
                    "dataType": "String",
                    "format": 0,
                    "name": "ContactDetailsFirstName",
                    "path": "ContactDetails_FirstName",
                    "validations": []
                },
                {
                    "dataType": "String",
                    "format": 0,
                    "name": "Description",
                    "path": "Description",
                    "validations": []
                }

            ],
            "links": [],
            "actions": [
                {
                    "doc": "api/clients/Contoso/test/Resources/CreateStaffMember",
                    "href": "api/clients/Contoso/test/StaffMembers/",
                    "method": "POST",
                    "rel": "CreateStaffMember",
                    "resource": "CreateStaffMember",
                    "type": "DefaultAction"
                },
                {
                    "doc": "api/clients/Contoso/test/Resources/DeleteStaffMember",
                    "href": "api/clients/Contoso/test/StaffMembers/{id:long}",
                    "method": "DELETE",
                    "rel": "DeleteStaffMember",
                    "resource": "DeleteStaffMember",
                    "type": "DefaultAction"
                },
                {
                    "doc": "api/clients/Contoso/test/Resources/UpdateStaffMember",
                    "href": "api/clients/Contoso/test/StaffMembers/{id:long}",
                    "method": "PATCH",
                    "rel": "UpdateStaffMember",
                    "resource": "UpdateStaffMember",
                    "type": "DefaultAction"
                }
            ]
        }
    }

    static UPDATE_METADATA() {
        return {
            "type": "StaffMemberResourceMetadata",
            "name": "StaffMember",
            "endpoint": {
                "doc": "api/clients/Contoso/test/Resources/DefaultStaffMember",
                "href": "api/clients/Contoso/test/StaffMembers/{id:long}",
                "method": "PATCH",
                "rel": "Update",
                "type": 0
            },
            "self": {
                "href": "api/clients/Contoso/test/Resources/DefaultStaffMember",
                "method": "GET",
                "rel": "ResourceSchema"
            },
            "properties": [
                {
                    "dataType": "String",
                    "format": 0,
                    "name": "Code",
                    "path": "Code",
                    "validations": [
                        { "required" : true },
                        { "minLength" : 5}  ]
                }
            ],
            "links": [
                {
                    "doc": "api/clients/Contoso/test/Resources/StaffMember",
                    "href": "api/clients/Contoso/test/StaffMembers/{id:long}",
                    "method": "GET",
                    "rel": "StaffMember",
                    "resource": "StaffMember",
                    "type": "DefaultAction"
                }
            ],
            "actions": [
                {
                    "doc": "api/clients/Contoso/test/Resources/CreateStaffMember",
                    "href": "api/clients/Contoso/test/StaffMembers/",
                    "method": "POST",
                    "rel": "CreateStaffMember",
                    "resource": "CreateStaffMember",
                    "type": "DefaultAction"
                },
                {
                    "doc": "api/clients/Contoso/test/Resources/DeleteStaffMember",
                    "href": "api/clients/Contoso/test/StaffMembers/{id:long}",
                    "method": "DELETE",
                    "rel": "DeleteStaffMember",
                    "resource": "DeleteStaffMember",
                    "type": "DefaultAction"
                }
            ]
        }
    }
}
