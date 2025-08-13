import { InputWithButton, InputWithButtonProps } from '@/components/input_field/InputWithButton'
import Settings from '@/components/Settings/Settings'
import { CheckboxProps } from '@/components/Settings/CheckBoxSettings'

interface InputButtonAndSettingsProps {
    input_with_button_props: InputWithButtonProps,
    check_box_props: CheckboxProps,
    collapsible_props: {
        allowed_websites: Array<String>;
        setAllowed_websites: React.Dispatch<React.SetStateAction<Array<String>>>;
        disallowed_websites: Array<String>;
        setDisAllowed_websites: React.Dispatch<React.SetStateAction<Array<String>>>;
    }
}

export default function InputButtonAndSettings(props: InputButtonAndSettingsProps) {
    return (
        <div className="flex items-center gap-4">
        <InputWithButton {...props.input_with_button_props}/>
        <Settings 
            checkboxProps={
                props.check_box_props
            }
            collapsible_props={
                props.collapsible_props
            }
        />
        </div>
    )
}
