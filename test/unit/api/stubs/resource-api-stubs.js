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

    static GET_DATA() {
        return {
            "type": "StaffMember",
            "id": 5000001001,
            "properties": {
            "CreatedByUserUserName": null,
                "CreatedOn": null,
                "ModifiedByUserUserName": null,
                "ModifiedOn": null,
                "Code": "JUMA",
                "ContactId": null,
                "ContactDepartment": null,
                "ContactFirstName": null,
                "ContactInitials": null,
                "ContactJobTitle": null,
                "ContactLastName": null,
                "EmailOnlyForCriticalAssets": null,
                "EmailOnWorkOrderApproval": null,
                "ExternalReference": null,
                "IsActive": null,
                "NormalTimeRate": null,
                "Notes": null,
                "OverTimeRate1": null,
                "OverTimeRate2": null,
                "OverTimeRate3": null,
                "PersonnelNumber": null,
                "PostNumber": null,
                "ReferenceColour": null,
                "SectionTradeParentCode": null,
                "SectionTradeTradeCode": null,
                "SiteCode": null,
                "SiteDescription": null,
                "SmsOnlyForCriticalAssets": null,
                "SmsOnWorkOrderApproval": null
        },
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
                "doc": "api/clients/Contoso/test/Resources/UpdateStaffMember",
                "href": "api/clients/Contoso/test/StaffMembers/5000001001",
                "method": "PATCH",
                "rel": "UpdateStaffMember",
                "resource": "UpdateStaffMember",
                "type": "DefaultAction"
            },
            {
                "doc": "api/clients/Contoso/test/Resources/DeleteStaffMember",
                "href": "api/clients/Contoso/test/StaffMembers/5000001001",
                "method": "DELETE",
                "rel": "DeleteStaffMember",
                "resource": "DeleteStaffMember",
                "type": "DefaultAction"
            }
        ]};
    }

    static GET_LIST_DATA() {
        return {
            "items": [
                {
                    "type": "DynamicRecord",
                    "properties": {
                        "id": -5000001185,
                        "version": 2,
                        "is_active": true,
                        "site_id": 5000001008,
                        "code": "PUMP008(1185)",
                        "description": "Fan",
                        "development_status": "NewAwaitingConfirmation",
                        "inheritance_type": "Inherited",
                        "record_type": "InplaceAsset",
                        "tree_level": 5,
                        "parent_asset_id": 5000001158,
                        "is_msi": true,
                        "is_critical": false,
                        "is_assessable": false,
                        "roll_up_point_id": null,
                        "asset_type_id": 5000001112,
                        "location_id": 5000001012,
                        "cost_centre_id": 5000001005,
                        "calendar_id": 5000001000,
                        "supplier_id": null,
                        "importance_id": null,
                        "serial_number": null,
                        "is_permit_required": false,
                        "downtime_cost_per_hour": 0,
                        "commissioned_on": null,
                        "warranty_expires_on": null,
                        "purchase_price": 0,
                        "current_value": 0,
                        "depreciation_id": 1,
                        "is_pms_offline": false,
                        "is_pms_online": false,
                        "is_running": true,
                        "general_ledger_id": 5000001001,
                        "scenario_id": 5000010023,
                        "sequence_number": 0,
                        "data_collector_id": null,
                        "shift_set_id": null,
                        "operator_list_id": null,
                        "artisan_list_id": null,
                        "supervisor_list_id": null,
                        "master_list_id": null,
                        "lock_out_tag_id": null,
                        "lock_out_tag_enable_value": null,
                        "lock_out_tag_disable_value": null,
                        "total_tag_id": null,
                        "total_tag_reset_value": null,
                        "good_tag_id": null,
                        "good_tag_reset_value": null,
                        "running_tag_id": null,
                        "running_tag_running_value": null,
                        "validate_batch": false,
                        "lock_out_interval": null,
                        "stop_detect_interval": null,
                        "progress_event_interval": null,
                        "criticality_model_id": null,
                        "criticality_inherit_parent": false,
                        "sync_opt_notes": null,
                        "previous_parent_asset_id": null,
                        "inherited_from_id": 5000001112,
                        "functional_location_id": null,
                        "is_for_scheduling_only": false,
                        "nearest_regular_asset_id": 5000001158,
                        "rule_evaluation_passed": true,
                        "last_confirmed_on": "2009-12-31T22:00:00",
                        "rules_last_evaluated_on": null,
                        "last_confirmed_change_log_id": null,
                        "synchronised_with_type_object_up_to": "2009-12-31T22:00:00",
                        "is_historical": false,
                        "is_linear": false,
                        "bar_code": null,
                        "is_selectable_for_down_time": false,
                        "external_reference": null,
                        "notes": null,
                        "geographic_data_id": null,
                        "created_on": "2008-12-31T22:00:00",
                        "created_by_user_id": 0,
                        "last_modified_on": "2008-12-31T22:00:00",
                        "last_modified_by_user_id": 0
                    },
                    "links": [],
                    "actions": []
                },
                {
                    "type": "DynamicRecord",
                    "properties": {
                        "id": -5000001184,
                        "version": 2,
                        "is_active": true,
                        "site_id": 5000001012,
                        "code": "PUMP007(1184)",
                        "description": "Fan",
                        "development_status": "NewAwaitingConfirmation",
                        "inheritance_type": "Inherited",
                        "record_type": "InplaceAsset",
                        "tree_level": 5,
                        "parent_asset_id": 5000001157,
                        "is_msi": true,
                        "is_critical": false,
                        "is_assessable": false,
                        "roll_up_point_id": null,
                        "asset_type_id": 5000001112,
                        "location_id": 5000001011,
                        "cost_centre_id": 5000001005,
                        "calendar_id": 5000001000,
                        "supplier_id": null,
                        "importance_id": null,
                        "serial_number": null,
                        "is_permit_required": false,
                        "downtime_cost_per_hour": 0,
                        "commissioned_on": null,
                        "warranty_expires_on": null,
                        "purchase_price": 0,
                        "current_value": 0,
                        "depreciation_id": 1,
                        "is_pms_offline": false,
                        "is_pms_online": false,
                        "is_running": true,
                        "general_ledger_id": 5000001001,
                        "scenario_id": 5000010023,
                        "sequence_number": 0,
                        "data_collector_id": null,
                        "shift_set_id": null,
                        "operator_list_id": null,
                        "artisan_list_id": null,
                        "supervisor_list_id": null,
                        "master_list_id": null,
                        "lock_out_tag_id": null,
                        "lock_out_tag_enable_value": null,
                        "lock_out_tag_disable_value": null,
                        "total_tag_id": null,
                        "total_tag_reset_value": null,
                        "good_tag_id": null,
                        "good_tag_reset_value": null,
                        "running_tag_id": null,
                        "running_tag_running_value": null,
                        "validate_batch": false,
                        "lock_out_interval": null,
                        "stop_detect_interval": null,
                        "progress_event_interval": null,
                        "criticality_model_id": null,
                        "criticality_inherit_parent": false,
                        "sync_opt_notes": null,
                        "previous_parent_asset_id": null,
                        "inherited_from_id": 5000001112,
                        "functional_location_id": null,
                        "is_for_scheduling_only": false,
                        "nearest_regular_asset_id": 5000001157,
                        "rule_evaluation_passed": true,
                        "last_confirmed_on": "2009-12-31T22:00:00",
                        "rules_last_evaluated_on": null,
                        "last_confirmed_change_log_id": null,
                        "synchronised_with_type_object_up_to": "2009-12-31T22:00:00",
                        "is_historical": false,
                        "is_linear": false,
                        "bar_code": null,
                        "is_selectable_for_down_time": false,
                        "external_reference": null,
                        "notes": null,
                        "geographic_data_id": null,
                        "created_on": "2008-12-31T22:00:00",
                        "created_by_user_id": 0,
                        "last_modified_on": "2008-12-31T22:00:00",
                        "last_modified_by_user_id": 0
                    },
                    "links": [],
                    "actions": []
                }
            ]
        };
    }

}
