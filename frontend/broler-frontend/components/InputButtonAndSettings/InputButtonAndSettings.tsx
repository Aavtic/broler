import { InputWithButton, InputWithButtonProps } from '@/components/input_field/InputWithButton'
import Settings from '@/components/Settings/Settings'
import { CheckboxProps } from '@/components/Settings/CheckBoxSettings'

interface InputButtonAndSettingsProps {
    input_with_button_props: InputWithButtonProps,
    settings_props: CheckboxProps,
}

export default function InputButtonAndSettings(props: InputButtonAndSettingsProps) {
    return (
        <>
        <InputWithButton {...props.input_with_button_props}/>
        <Settings {...props.settings_props} />
        </>
    )
}
