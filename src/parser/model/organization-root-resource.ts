import { IResource, IResourceRef, TemplateRoot } from '../parser';
import { Reference, Resource } from './resource';
import { ServiceControlPolicyResource } from './service-control-policy-resource';

export interface IOrganizationRootProperties {
    ServiceControlPolicies: IResourceRef | IResourceRef[];
    DefaultOrganizationAccessRoleName?: string;
    DefaultBuildAccessRoleName?: string;
    DefaultDevelopmentBuildAccessRoleName?: string;
    MirrorInPartition?: boolean;
    CloseAccountsOnRemoval?: boolean;
}


export class OrganizationRootResource extends Resource {
    public serviceControlPolicies: Reference<ServiceControlPolicyResource>[] = [];
    private props: IOrganizationRootProperties;
    public defaultOrganizationAccessRoleName?: string;
    public defaultBuildAccessRoleName?: string;
    public defaultDevelopmentBuildAccessRoleName?: string;
    public mirrorInPartition?: boolean;
    public closeAccountsOnRemoval?: boolean;

    constructor(root: TemplateRoot, id: string, resource: IResource) {
        super(root, id, resource);

        this.props = this.resource.Properties as IOrganizationRootProperties;

        super.throwForUnknownAttributes(resource, id, 'Type', 'Properties');
        super.throwForUnknownAttributes(this.props, id, 'ServiceControlPolicies', 'DefaultOrganizationAccessRoleName', 'DefaultBuildAccessRoleName', 'DefaultDevelopmentBuildAccessRoleName', 'MirrorInPartition', 'CloseAccountsOnRemoval');

        if (this.props) {
            this.defaultOrganizationAccessRoleName = this.props.DefaultOrganizationAccessRoleName;
            this.defaultBuildAccessRoleName = this.props.DefaultBuildAccessRoleName;
            this.defaultDevelopmentBuildAccessRoleName = this.props.DefaultDevelopmentBuildAccessRoleName;
            this.mirrorInPartition = this.props.MirrorInPartition;
            this.closeAccountsOnRemoval = this.props.CloseAccountsOnRemoval;
        }
    }

    public resolveRefs(): void {
        if (this.props) {
            this.serviceControlPolicies = super.resolve(this.props.ServiceControlPolicies, this.root.organizationSection.serviceControlPolicies);
        } else  {
            this.serviceControlPolicies = [];
        }
    }
}
