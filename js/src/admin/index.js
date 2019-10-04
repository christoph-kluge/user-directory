import {extend} from 'flarum/extend';
import app from 'flarum/app';
import PermissionGrid from 'flarum/components/PermissionGrid';
import PermissionDropdown from 'flarum/components/PermissionDropdown';
import SettingsModal from '@fof/components/admin/settings/SettingsModal';
import BooleanItem from '@fof/components/admin/settings/items/BooleanItem';

app.initializers.add('fof-user-directory', app => {
    extend(PermissionGrid.prototype, 'viewItems', items => {
        items.add('fof-user-directory', {
            icon: 'far fa-address-book',
            label: app.translator.trans('fof-user-directory.admin.permissions.view_user_directory'),
            permission: 'fof.user-directory.view',
            allowGuest: true,
        });
        items.add('fof-user-directory-visibility', {
          icon: 'far fa-address-book',
          label: app.translator.trans('fof-user-directory.admin.permissions.group_visibility.label'),
          setting: () => {
            return PermissionDropdown.component();
            // return SettingDropdown.component({
            //   defaultLabel: app.translator.trans('fof-user-directory.admin.permissions.items.show_all_groups'),
            //   key: 'fof-user-directory-visibility',
            //   options: [
            //     {value: '-1', label: app.translator.trans('fof-user-directory.admin.permissions.items.show_all_groups')},
            //     {value: 'no_admins', label: app.translator.trans('fof-user-directory.admin.permissions.items.no_admins')},
            //     {value: 'no_mods', label: app.translator.trans('fof-user-directory.admin.permissions.items.no_mods')}
            //   ]
            // });
          }
        });
    });

    app.extensionSettings['fof-user-directory'] = () =>
        app.modal.show(
            new SettingsModal({
                title: app.translator.trans('fof-user-directory.admin.settings.title'),
                size: 'medium',
                items: [
                    <BooleanItem key="fof-user-directory-link">
                        {app.translator.trans('fof-user-directory.admin.settings.link')}
                    </BooleanItem>,
                    <PermissionDropdown key="fof-user-directory-visibility">
                      {app.translator.trans('fof-user-directory.admin.settings.visibility')}
                    </PermissionDropdown>,
                ],
            })
        );
});
